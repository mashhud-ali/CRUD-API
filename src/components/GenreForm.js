import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { addGenre, getSingleGenre, updateGenre } from "../services/genreService"
import Input from './Input'

function AddGenre() {
  const { id } = useParams()
  const history = useHistory()
  const [loading, setloading] = useState(0)
  const [error, seterror] = useState({})
  const [data, setData] = useState({
    name: ''
  })

  const validator = () => {
    const errors = {}
    if (!data.name) {
      errors['name'] = "Genre Name is Required"
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  useEffect(() => {
    if (id !== 'new') {
      getSingleGenre(id).then(res => {
        setData({
          ...data,
          name: res.data.name
        })
      })
        .catch(err => {
          history.push('/genres');
          console.log(err)
        })
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validator();
    seterror(errors || {})
    if (!errors) {
      setloading(1)
      if (id !== 'new') {
        updateGenre(data, id)
          .then(res => {
            history.push('/genres')
          })
          .catch(err => {
          })
      }
      else if (id === 'new') {
        addGenre(data)
          .then(res => {
            setloading(0)
            history.push('/genres')
          }).catch(err => {
            seterror({ ...error, serverError: err.response.data })
            setloading(0)
          })
      }
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <h1 className="text-center">{id === 'new' ? 'Add Genres' : 'Update Genre'}</h1>
            {error.serverError
              ? (<div class="alert alert-danger text-center" role="alert">
                {error.serverError}
              </div>
              ) : ''}
            <form onSubmit={handleSubmit}>
              <Input
                label="Genre Name"
                id="name"
                name="name"
                placeholder="Enter Genre"
                value={data.name}
                onChange={handleChange}
                error={error.name}
                className={error.name ? "form-control border border-danger" : "form-control"} />
              {loading
                ? <BeatLoader />
                : (<input type="submit" className="form-control" class="btn btn-info w-25" />)
              }
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AddGenre
