import axios from 'axios';

const API_URL = 'http://localhost:5171/api';

export const registerUser = (userData: { username: string, password: string, email: string }) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = (userData: { username: string, password: string }) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const getProducts = () => {
  return axios.get(`${API_URL}/products`);
};

export const addToCart = (cartItem: { productId: number, quantity: number, userId: number }) => {
  return axios.post(`${API_URL}/cart`, cartItem);
};

export const getCartItems = (userId: number) => {
  return axios.get(`${API_URL}/cart/${userId}`);
};
