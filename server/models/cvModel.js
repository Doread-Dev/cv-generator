const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  duration: String,
  responsibilityAndAchievement: String,
});

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  duration: String,
});

const trainingSchema = new mongoose.Schema({
  name: String,
  provider: String,
  duration: String,
});

const languageSchema = new mongoose.Schema({
  name: String,
  level: String,
});

const referenceSchema = new mongoose.Schema({
  name: String,
  position: String,
  company: String,
  contact: String,
});

const skillsSchema = new mongoose.Schema({
  technicalSkills: [String],
  softSkills: [String],
  languages: [languageSchema],
});

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // link to user

    personalInfo: {
      fullName: String,
      professionalTitle: String,
      email: String,
      phone: String,
      location: String,
    },
    professionalSummary: String,
    workExperience: [workExperienceSchema],
    education: [educationSchema],
    trainingAndCourses: [trainingSchema],
    skills: skillsSchema,
    references: [referenceSchema],
    targetedPosition: String,
    ATSscore: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CV", cvSchema);
