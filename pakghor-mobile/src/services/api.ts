import axios from "axios";

// ======== Base Configuration ========
// Change this URL to your backend API (example: render/vercel/localhost)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======== Authentication APIs ========

export const registerUser = async (username: string, email: string, mobile: string, password: string) => {
  try {
    const res = await api.post("/register", { username, email, mobile, password });
    return res.data;
  } catch (err: any) {
    console.error("Signup Error:", err.response?.data || err.message);
    throw err;
  }
};

export const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const res = await api.post("/login", { usernameOrEmail, password });
    return res.data;
  } catch (err: any) {
    console.error("Login Error:", err.response?.data || err.message);
    throw err;
  }
};

// ======== Card / Product APIs ========

export const getCards = async () => {
  try {
    const res = await api.get("/cards");
    return res.data;
  } catch (err: any) {
    console.error("Fetch Cards Error:", err.response?.data || err.message);
    throw err;
  }
};

export const addCard = async (cardData: any) => {
  try {
    const res = await api.post("/cards", cardData);
    return res.data;
  } catch (err: any) {
    console.error("Add Card Error:", err.response?.data || err.message);
    throw err;
  }
};

// ======== Order APIs (if applicable) ========

export const createOrder = async (orderData: any) => {
  try {
    const res = await api.post("/orders", orderData);
    return res.data;
  } catch (err: any) {
    console.error("Order Error:", err.response?.data || err.message);
    throw err;
  }
};

// ======== Export Default Instance ========
export default api;
