// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getPortfolio = () => axios.get(`${API_BASE_URL}/portfolio`);
export const getTransactions = () => axios.get(`${API_BASE_URL}/transactions`);
export const addTransaction = (transaction) => axios.post(`${API_BASE_URL}/transactions`, transaction);
