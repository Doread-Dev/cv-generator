import axios from "axios";

const API_URL = "http://localhost:5000/savecv";

export const submitCV = async (cvData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return;
  }

  try {
    const response = await axios.post(API_URL, cvData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting CV:",
      error.response?.data || error.message
    );
    throw error;
  }
};
