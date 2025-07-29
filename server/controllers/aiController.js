const { default: axios } = require("axios");
require("dotenv").config();


const AtsController = async (req, res) => {
  const { cvData, targetedPosition } = req.body;

  const aiModels = [
    {
      name: "moonshotai/kimi-k2:free",
      maxTokens: 2000,
      temperature: 0.3,
    },
    {
      name: "google/gemini-flash-1.5-8b",
      maxTokens: 2000,
      temperature: 0.3,
    },
    {
      name: "microsoft/phi-3-mini-128k-instruct:free",
      maxTokens: 1500,
      temperature: 0.3,
    },
    {
      name: "qwen/qwen-2-7b-instruct:free",
      maxTokens: 1500,
      temperature: 0.3,
    },
  ];

  const retryConfig = {
    maxRetries: 3,
    baseDelay: 1000, 
    maxDelay: 10000, 
    backoffFactor: 2,
  };

  const sectionMapping = {
    personalInfo: "Personal Information",
    professionalSummary: "Professional Summary",
    workExperience: "Work Experience",
    education: "Education",
    trainingAndCourses: "Training and Courses",
    skills: "Skills",
    references: "References",
    keyword_optimization: "Keyword Optimization",
  };

  const hasValidData = (data) => {
    if (!data || data === null || data === undefined) return false;

    if (Array.isArray(data)) {
      return data.length > 0;
    }

    if (typeof data === "object") {
      return (
        Object.keys(data).length > 0 &&
        Object.values(data).some(
          (val) =>
            val !== null &&
            val !== undefined &&
            val !== "" &&
            (Array.isArray(val) ? val.length > 0 : true)
        )
      );
    }

    if (typeof data === "string") {
      return data.trim().length > 0;
    }

    return true;
  };

  const availableSections = Object.keys(sectionMapping).filter((section) => {
    return cvData.hasOwnProperty(section) && hasValidData(cvData[section]);
  });

  const createSectionSchema = (sectionKeys) => {
    return sectionKeys
      .map((section) => {
        return `"${section}": {
      "title": "${sectionMapping[section]}",
      "score": 0,
      "status": "string",
      "comment": "string",
      "recommendation": []
    }`;
      })
      .join(",\n    ");
  };

  const formatCVData = (cvData) => {
    const formatted = {};

    if (cvData.personalInfo && hasValidData(cvData.personalInfo)) {
      formatted.personalInfo = cvData.personalInfo;
    }

    if (
      cvData.professionalSummary &&
      hasValidData(cvData.professionalSummary)
    ) {
      formatted.professionalSummary = cvData.professionalSummary;
    }

    if (cvData.workExperience && hasValidData(cvData.workExperience)) {
      formatted.workExperience = cvData.workExperience;
    }

    if (cvData.education && hasValidData(cvData.education)) {
      formatted.education = cvData.education;
    }

    if (cvData.trainingAndCourses && hasValidData(cvData.trainingAndCourses)) {
      formatted.trainingAndCourses = cvData.trainingAndCourses;
    }

    if (cvData.skills && hasValidData(cvData.skills)) {
      formatted.skills = cvData.skills;
    }

    if (cvData.references && hasValidData(cvData.references)) {
      formatted.references = cvData.references;
    }

    return formatted;
  };


  const formattedCVData = formatCVData(cvData);

  const prompt = `
You are an ATS (Applicant Tracking System). Analyze the following CV for the job position of "${targetedPosition}".

IMPORTANT INSTRUCTIONS:
1. I am sending you CV data with the following sections: ${availableSections.join(
    ", "
  )}
2. You MUST analyze and provide feedback for EACH section I'm sending
3. Do NOT claim any section is missing - I'm only sending the sections that exist
4. Give each section a score from 0 to 100 based on relevance to the job position
5. Provide specific recommendations for improvement

CV Data Structure:
- personalInfo: Contains fullName, professionalTitle, email, phone, location
- professionalSummary: Professional summary text
- workExperience: Array of work experiences with company, position, duration, responsibility, achievement
- education: Array of education entries with institution, degree, duration
- trainingAndCourses: Array of training/courses with name, provider, duration
- skills: Object containing technicalSkills, softSkills, languages arrays
- references: Array of references with name, position, company, contact

CV Data:
${JSON.stringify(formattedCVData, null, 2)}

Job Position: ${targetedPosition}

Respond ONLY in valid JSON format with this exact structure:
{
  "ats_score": {
    "score": 85,
    "label": "Good Match",
    "comment": "Overall assessment comment",
    "recommendation": ["Overall improvement suggestions"]
  },
  "sections": {
    ${createSectionSchema(availableSections)}
  }
}

CRITICAL: Only include sections that I provided in the CV data. Do not add sections I didn't send.`;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const calculateDelay = (attempt) => {
    const delay = Math.min(
      retryConfig.baseDelay * Math.pow(retryConfig.backoffFactor, attempt),
      retryConfig.maxDelay
    );
    return delay + Math.random() * 1000;
  };

  const retryWithModel = async (model, attempt = 0) => {
    try {
      console.log(
        `Attempting with model: ${model.name}, attempt: ${attempt + 1}`
      );

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: model.name,
          messages: [
            {
              role: "system",
              content:
                "You are an ATS system. You must analyze only the CV sections provided and respond in valid JSON format. Do not claim sections are missing if they weren't provided.",
            },
            { role: "user", content: prompt },
          ],
          temperature: model.temperature,
          max_tokens: model.maxTokens,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
          },
          timeout: 30000, 
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        `Error with model ${model.name}, attempt ${attempt + 1}:`,
        error.message
      );

      const isRetryableError =
        error.code === "ECONNABORTED" || // timeout
        error.code === "ENOTFOUND" || // network error
        (error.response && error.response.status >= 500) || // server error
        (error.response && error.response.status === 429) || // rate limit
        (error.response && error.response.status === 503); // service unavailable

      if (isRetryableError && attempt < retryConfig.maxRetries) {
        const delay = calculateDelay(attempt);
        console.log(`Retrying after ${delay}ms...`);
        await sleep(delay);
        return retryWithModel(model, attempt + 1);
      }

      throw error;
    }
  };

  const tryAllModels = async () => {
    let lastError;

    for (let i = 0; i < aiModels.length; i++) {
      try {
        console.log(
          `Trying model ${i + 1}/${aiModels.length}: ${aiModels[i].name}`
        );
        const result = await retryWithModel(aiModels[i]);
        console.log(`Success with model: ${aiModels[i].name}`);
        return { result, modelUsed: aiModels[i].name };
      } catch (error) {
        console.error(`Failed with model ${aiModels[i].name}:`, error.message);
        lastError = error;

        if (i < aiModels.length - 1) {
          await sleep(2000); 
        }
      }
    }

    throw lastError;
  };

  const extractJSON = (text) => {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      return null;
    }

    const jsonString = text.slice(jsonStart, jsonEnd + 1);

    try {
      JSON.parse(jsonString);
      return jsonString;
    } catch (e) {
      console.error("Invalid JSON extracted:", e);
      return null;
    }
  };

  try {
    console.log("Starting AI analysis...");
    console.log("Available sections:", availableSections);
    console.log("Formatted CV data:", formattedCVData);

    if (availableSections.length === 0) {
      return res.status(400).json({
        error: "No valid CV sections found for analysis",
        receivedData: cvData,
        suggestions: [
          "Make sure CV data contains at least one of: personalInfo, professionalSummary, workExperience, education, trainingAndCourses, skills, references",
          "Check that the data structure matches the CV schema",
          "Ensure arrays are not empty and objects contain valid data",
        ],
      });
    }

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error("Request timeout after 2 minutes")),
        120000
      );
    });

    const analysisPromise = tryAllModels();
    const { result, modelUsed } = await Promise.race([
      analysisPromise,
      timeoutPromise,
    ]);

    const messageContent = result.choices[0].message.content;
    console.log(`AI Response from ${modelUsed}:`, messageContent);

    const jsonString = extractJSON(messageContent);
    if (!jsonString) {
      return res.status(400).json({
        error: "No valid JSON found in AI response",
        content: messageContent,
        availableSections: availableSections,
        modelUsed: modelUsed,
      });
    }

    const parsedResult = JSON.parse(jsonString);

    if (!parsedResult.ats_score || !parsedResult.sections) {
      return res.status(400).json({
        error: "Invalid response structure from AI",
        content: messageContent,
        parsed: parsedResult,
        modelUsed: modelUsed,
      });
    }

    parsedResult.metadata = {
      modelUsed: modelUsed,
      sectionsAnalyzed: availableSections,
      timestamp: new Date().toISOString(),
    };

    res.json(parsedResult);
  } catch (error) {
    console.error("Final error after all attempts:", error);

    let errorMessage = "Error processing CV";
    let statusCode = 500;

    if (error.message.includes("timeout")) {
      errorMessage = "Request timeout - all AI models are currently busy";
      statusCode = 503;
    } else if (error.response && error.response.status === 429) {
      errorMessage = "Rate limit exceeded - please try again later";
      statusCode = 429;
    } else if (error.response && error.response.status >= 500) {
      errorMessage = "AI service temporarily unavailable";
      statusCode = 503;
    }

    res.status(statusCode).json({
      error: errorMessage,
      details: error.message,
      availableSections: availableSections,
      suggestions: [
        "Try again in a few minutes",
        "The AI models might be experiencing high traffic",
        "Your request will be processed as soon as resources are available",
      ],
    });
  }
};

const improveSummaryController = async (req, res) => {
  const { summaryText, targetedPosition } = req.body;

  if (!summaryText || !targetedPosition) {
    return res.status(400).json({ error: "Missing input" });
  }

  const models = [
    "moonshotai/kimi-k2:free",
    "google/gemini-flash-1.5-8b",
    "qwen/qwen-2-7b-instruct:free"
  ];

  const prompt = `
Rewrite the following professional summary as a **single professional paragraph** tailored for the position of "${targetedPosition}". Do NOT include multiple options or improvement tips. Just return one polished version only.

Summary:
${summaryText}
`;

  try {
    let result = null;
    for (let model of models) {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,
            messages: [
              {
                role: "system",
                content: "You are a professional resume writer.",
              },
              { role: "user", content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 300
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json"
            },
            timeout: 30000
          }
        );

        result = response.data.choices[0].message.content.trim();
        break;
      } catch (err) {
        console.warn(`Model ${model} failed, trying next...`);
      }
    }

    if (!result) {
      return res.status(500).json({ error: "All models failed" });
    }

    res.json({ improvedSummary: result });
  } catch (error) {
    res.status(500).json({
      error: "Failed to improve summary",
      message: error.message
    });
  }
};

const improveResponsibilityController = async (req, res) => {
  const { responsibilityText, professionalTitle } = req.body;

  if (!responsibilityText || !professionalTitle) {
    return res.status(400).json({ error: "Missing input" });
  }

  const models = [
    "moonshotai/kimi-k2:free",
    "google/gemini-flash-1.5-8b",
    "qwen/qwen-2-7b-instruct:free"
  ];

  const prompt = `
Rewrite the following job responsibilities and achievements as a single professional paragraph optimized for ATS and tailored for the job title "${professionalTitle}". 
Do NOT include multiple options, comments, or improvement tips. Just return one clear and polished paragraph.
Text:
${responsibilityText}
`;

  try {
    let result = null;
    for (let model of models) {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,
            messages: [
              {
                role: "system",
                content: "You are an expert in resume optimization.",
              },
              { role: "user", content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 300
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json"
            },
            timeout: 30000
          }
        );

        result = response.data.choices[0].message.content.trim();
        break;
      } catch (err) {
        console.warn(`Model ${model} failed, trying next...`);
      }
    }

    if (!result) {
      return res.status(500).json({ error: "All models failed" });
    }

    res.json({ improvedResponsibility: result });
  } catch (error) {
    res.status(500).json({
      error: "Failed to improve responsibility",
      message: error.message
    });
  }
};

const improveSkillsController = async (req, res) => {
  const { rawSkillsText, targetedPosition } = req.body;

  if (!rawSkillsText || !targetedPosition) {
    return res.status(400).json({ error: "Missing input" });
  }

  const models = [
    "moonshotai/kimi-k2:free",
    "google/gemini-flash-1.5-8b",
    "qwen/qwen-2-7b-instruct:free"
  ];

const prompt = `
Based on the following description, extract and organize relevant skills for the position of "${targetedPosition}".
Group them into three categories: Technical Skills, Soft Skills, and Languages.
Return the result as clean, plain text without any Markdown, special characters, or bullet points.
Use simple line breaks and indentation for clarity.
If no languages are mentioned, write "Languages: Not specified".
Add a concise summary sentence at the end.
Text:
${rawSkillsText}
`;

  try {
    let result = null;
    for (let model of models) {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,
            messages: [
              {
                role: "system",
                content: "You are a resume skill extraction assistant.",
              },
              { role: "user", content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 400
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json"
            },
            timeout: 30000
          }
        );

        result = response.data.choices[0].message.content.trim();
        break;
      } catch (err) {
        console.warn(`Model ${model} failed, trying next...`);
      }
    }

    if (!result) {
      return res.status(500).json({ error: "All models failed" });
    }

    res.json({ improvedSkills: result });
  } catch (error) {
    res.status(500).json({
      error: "Failed to improve skills",
      message: error.message
    });
  }
};




module.exports = {
  AtsController,
  improveSummaryController,
  improveResponsibilityController,
  improveSkillsController,
};
