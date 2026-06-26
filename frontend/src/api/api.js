import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const pizzaAPI = {
  getAll: (params) => API.get('/pizzas', { params }),
  getById: (id) => API.get(`/pizzas/${id}`),
  create: (data) => API.post('/pizzas', data),
  update: (id, data) => API.put(`/pizzas/${id}`, data),
  delete: (id) => API.delete(`/pizzas/${id}`),
};

export const ingredientAPI = {
  getAll: () => API.get('/ingredients'),
  create: (data) => API.post('/ingredients', data),
};

export const cartAPI = {
  getAll: () => API.get('/cart'),
  add: (data) => API.post('/cart', data),
  update: (id, data) => API.put(`/cart/${id}`, data),
  remove: (id) => API.delete(`/cart/${id}`),
  clear: () => API.delete('/cart/clear'),
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getAll: () => API.get('/orders'),
};

export default API;
