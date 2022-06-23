import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const createSession = async (userName, password) => {
  return api.post('/auth', {userName, password});
};
