import axios from 'axios';

export const getMovies = queryParams => {
  const url = `${process.env.REACT_APP_API_URL}/movies${queryParams ? '?' + queryParams : ''}`;
  return axios.get(url);
}

export const addMovie = (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return axios.post(`${process.env.REACT_APP_API_URL}/movies`, data, {
    headers: {
      'x-auth-token': token
    }
  });
}

export const updateMovie = (data, id) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return axios.put(`${process.env.REACT_APP_API_URL}/movies/${id}`, data, {
    headers: {
      'x-auth-token': token
    }
  });
}

export const getMovie = id => {
  console.log(process.env.REACT_APP_API_URL)
  return axios.get(`${process.env.REACT_APP_API_URL}/movies/${id}`);
}

export const paginateMovies = queryParams => {
  const url = `${process.env.REACT_APP_API_URL}/movies${queryParams ? '?' + queryParams : ''}`;
  return axios.get(url);
}

export const deleteMovie = id => {
  const token = JSON.parse(localStorage.getItem('token'))
  return axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`, {
    headers: {
      'x-auth-token': token
    }
  });
}

