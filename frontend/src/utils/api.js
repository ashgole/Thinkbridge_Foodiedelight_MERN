import { LOCAL_URL, GET_DATA } from "../constants/constants.jsx";
import axios from 'axios'

export const getData = async (api) => {
  try {
    const response = await axios.get(LOCAL_URL + api);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};

export const postData = async (api, payload) => {
  try {
    const response = await axios.post(LOCAL_URL + api, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};

export const updateData = async (api, payload) => {
  try {
    const response = await axios.post(LOCAL_URL + api, payload);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};
export const deleteData = async (api, payload) => {
  try {
    const response = await axios.post(LOCAL_URL + api, payload);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    return error;
  }
};