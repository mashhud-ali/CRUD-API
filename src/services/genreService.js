import axios from "axios";

export const getGenres = queryParams => {
  const url = `${process.env.REACT_APP_API_URL}/genres${queryParams ? '?' + queryParams : ''}`;
  return axios.get(url);
}

export const addGenre = data => {
  const token = JSON.parse(localStorage.getItem('token'))
  return axios.post(`${process.env.REACT_APP_API_URL}/genres`, data, {
    headers: {
      'x-auth-token': token
    }
  });
}

export const getSingleGenre = id => {
  return axios.get(`${process.env.REACT_APP_API_URL}/genres/${id}`)
}

export const updateGenre = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return axios.put(`${process.env.REACT_APP_API_URL}/genres/${id}`, data, {
    headers: {
      'x-auth-token': token
    }
  });
}