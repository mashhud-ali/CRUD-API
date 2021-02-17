import axios from "axios";
import jwt from 'jsonwebtoken';

export const register = credentials => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users`, credentials);
}

export const login = credentials => {
  return axios.post(`${process.env.REACT_APP_API_URL}/auth`, credentials);
}

export const logout = () => {
  localStorage.removeItem('token');
}

export const isLogin = () => {
  return localStorage.token ? true : false;
}

export const getCurrentUser = () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const user = jwt.decode(token);
    return user;
  } catch (ex) {
    console.log(ex.message);
    return false
  }
}