// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://clothing-ecommerce-backend-1.onrender.com",
  withCredentials: true, // allow cookies for JWT
});

export default API;
