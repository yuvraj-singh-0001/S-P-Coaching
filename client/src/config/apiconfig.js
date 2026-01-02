// client/src/config/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = {
  BASE_URL,

  // AUTH (LOGIN / SIGNUP)
  AUTH: `${BASE_URL}/auth`,

  // ADMIN
  ADMIN: `${BASE_URL}/admin`,

  // STUDENT
  STUDENT: `${BASE_URL}/student`,

  // CONTACT
  CONTACT: `${BASE_URL}/contact`,
};

export default API;
