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

export const addProduct = (productData: { name: string, price: number, description: string, imageUrl: string }) => {
  return axios.post(`${API_URL}/products`, productData);
};

export const updateProduct = (productId: number, productData: { name: string, price: number, description: string, imageUrl: string }) => {
  return axios.put(`${API_URL}/products/${productId}`, productData);
};

export const deleteProduct = (productId: number) => {
  return axios.delete(`${API_URL}/products/${productId}`);
};

export const addToCart = (cartItem: { productId: number, quantity: number, userId: number }) => {
  return axios.post(`${API_URL}/cart`, cartItem);
};

export const getCartItems = (userId: number) => {
  return axios.get(`${API_URL}/cart/${userId}`);
};

export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const addUser = (userData: { username: string, password: string, email: string }) => {
  return axios.post(`${API_URL}/users`, userData);
};

export const updateUser = (userId: number, userData: { username: string, password: string, email: string }) => {
  return axios.put(`${API_URL}/users/${userId}`, userData);
};

export const deleteUser = (userId: number) => {
  return axios.delete(`${API_URL}/users/${userId}`);
};
