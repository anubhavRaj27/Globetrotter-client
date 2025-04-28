import axiosWithHeaders from "./utils/axios.js";
import axios from "axios";
import { getApiUrl } from "./utils/config.js";

export const createAccount = async (email, password, name) => {
  try {
    const response = await axios.post(`${getApiUrl()}/auth/register`, {
      email,
      password,
      name,
    });
    return response.data;
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data?.error || e.message);
    } else {
      throw new Error(e.message);
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${getApiUrl()}/auth/login`, { email, password });
    return response.data;
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data?.error || e.message);
    } else {
      throw new Error(e.message);
    }
  }
};
