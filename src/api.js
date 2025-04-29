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

export const getRandomCity = async (userId) => {
  try{
    const response = await axiosWithHeaders.get(`/cities/city/random?userId=${userId}`);
    return response.data;
  }catch (e) {
    if (e.response) {
      throw new Error(e.response.data?.error || e.message);
    } else {
      throw new Error(e.message);
    }
  }
}

export const getCity = async (cityId) => {
  try{
    const response = await axiosWithHeaders.get(`/cities/city/${cityId}`);
    return response.data;
  }catch (e) {
    if (e.response) {
      throw new Error(e.response.data?.error || e.message);
    } else {
      throw new Error(e.message);
    }
  }
}

export const getUser = async (userId) => {
  try{
    const response = await axiosWithHeaders.get(`/user/${userId}`);
    return response.data;
  }catch (e) {
    if (e.response) {
      throw new Error(e.response.data?.error || e.message);
    } else {
      throw new Error(e.message);
    }
  }
}

export const getAnswer = async (answer,cityId) => {
  try{
    const response = await axiosWithHeaders.get(`/cities/answer/${cityId}?answer=${answer}`);
    return response.data;
  }catch (e) {
    if (e.response) {
      throw new Error(e.response.data?.error || e.message);
    } else {
      throw new Error(e.message);
    }
  }
}

export const updateUserDb = async (userId,user) => {
  try{
    const response = await axiosWithHeaders.patch(`/user/update/${userId}`,{user});
    return response.data;
  }catch (e) {
    if (e.response) {
      throw new Error(e.response.data?.error || e.message);
    } else {
      throw new Error(e.message);
    }
  }
}
