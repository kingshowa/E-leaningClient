import axios from "axios";

const BASE_URL = "http://e-learningsystem.test/api";

// Function to fetch objects
export const fetchObjects = async (url) => {
  // name of the objects and their parent id
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch objects");
  }
};

// Function to delete an object
export const deleteObject = async (url) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete`);
  }
};

// Function to delete an object
export const restoreObject = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to restore`);
  }
};

// Function to post data (generic POST request)
export const postData = async (formData, url) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to post data: ${error.message}`);
  }
};
// Function to post data (generic POST request)
export const editData = async (formData, url) => {
  try {
    const response = await axios.put(`${BASE_URL}/${url}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to post data: ${error.message}`);
  }
};

export default {
  fetchObjects,
  deleteObject,
  restoreObject,
  postData,
  // Other exported functions...
};
