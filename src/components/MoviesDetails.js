import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../services/movieService';

function MoviesDetails() {
  const { id } = useParams()
  const [data, setData] = useState({
    title: '',
    dailyRentalRate: '',
    numberInStock: '',
    genreId: '',
    imageUrl: ''
  })

  useEffect(() => {
    getMovie(id)
      .then(response => {
        setData({
          ...data,
          title: response.data.title,
          dailyRentalRate: response.data.dailyRentalRate,
          numberInStock: response.data.numberInStock,
          genreId: response.data.genre.name,
          imageUrl: response.data.imageUrl
        })
      })
  }, [])

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 ">
            <h1 className="d-flex justify-content-center text-info">Movie Details</h1>
            <div className="d-flex justify-content-center">
              <form className="w-50 p-3">
                <label>Title</label>
                <input className="form-control" value={data.title} disabled />
                <label>Genre</label>
                <input className="form-control" value={data.genreId} disabled />
                <label>Rent Rate</label>
                <input className="form-control" value={data.dailyRentalRate} disabled />
                <label>Stock</label>
                <input className="form-control" value={data.numberInStock} disabled />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesDetails;
