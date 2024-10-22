import axios from "axios";
import { getToken } from "./helper";


const BASE_URL = import.meta.env.VITE_BASE_URL;

const publicInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const privateInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    console.log("Token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const otherInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  transformRequest: (data) => {
    return data;
  },
});

otherInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const publicRequest = async (url, method, data) => {
  try {
    const response = await publicInstance.request({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Public request error:", error);
    throw error;
  }
};

const privateRequest = async (url, method, data) => {
  try {
    const response = await privateInstance.request({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Private request error:", error);
    throw error;
  }
};

const otherRequest = async (url, method, data) => {
  try {
    const response = await otherInstance.request({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Other request error:", error);
    throw error;
  }
};

export { publicRequest, privateRequest, otherRequest };
