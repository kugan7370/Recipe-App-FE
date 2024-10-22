import { publicRequest } from "../services/AxiosInstance";

const loginUser = async (credentials) => {
  try {
    const url = "/user/login";
    const method = "POST";
    const data = credentials;

    const response = await publicRequest(url, method, data);
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const registerUser = async (userDetails) => {
  try {
    const url = "/user/register";
    const method = "POST";
    const data = userDetails;

    const response = await publicRequest(url, method, data);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export { loginUser, registerUser };
