import axios from 'axios';
// const API_URL = 'http://localhost:1200/api/v1';
// const API_URL = 'https://apply-oqvest-api.vercel.app';
const API_URL = 'https://api.oqteq.com/api/v1';
const SERVER_PUBLIC_URL = 'https://api.oqteq.com/';

function encryptData(data) {
  // Implement a proper encryption algorithm here
  return btoa(data); // Base64 encoding as a simple example
}

// Decryption function
function decryptData(data) {
  // Implement a proper decryption algorithm here
  return atob(data); // Base64 decoding as a simple example
}

const getCompany = async (url) => {
  try {
    const res = await axios.get(
      API_URL + `/company/?url=${url}`
    );
    localStorage.setItem('c_id',res.data.data[0].id);
    localStorage.setItem('c_logo',SERVER_PUBLIC_URL + res.data.data[0].logo);
    return { ...res.data };
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
};

const login = async (userData) => {
  try {
    const res = await axios.post(
      API_URL + "/user/login",
      userData
    );
    if (res.data?.success === true) {
      localStorage.setItem("refreshToken", res.data.user.token);
      localStorage.setItem("ui", encryptData(res.data.user.id));
      localStorage.setItem("accessToken", `bearer ${res.data.user.token}`);
      return { ...res.data.user };
    }
  } catch (err) {
    throw new Error(err.response?.data.message);
  }
};

const getUser = async (userId) => {
  try {
    const res = await axios.get(
      API_URL + `/user/${decryptData(userId)}`
    );

    return { ...res.data };
  } catch (err) {
    localStorage.clear()
    throw new Error(err.response.data.error.message);
  }
};

const authService = {
  getCompany,
  login,
  getUser,
  encryptData,
  decryptData
}

export default authService;