import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { Link, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { getGenres } from '../services/genreService'
import { isLogin } from '../services/authService'
import Table from './Table';

function Genre() {
  const history = useHistory()
  const [genreData, setGenreData] = useState([])
  const [loading, setloading] = useState(0)
  const [sortColumn, setSortColumn] = useState({
    name: '',
    order: ''
  })

  const columns = [
    { id: 1, name: 'name', label: 'Genre' }
  ]

  useEffect(() => {
    getGenres()
      .then(res => {
        console.log(res.data);
        setGenreData(res.data.genres);
        setloading(1)
      })
  }, [])

  const handleAuth = () => {
    isLogin() ? history.push('/genres/new') : history.push('/userlogin')
  }
  const handleSort = newSortColumn => {
    setSortColumn(newSortColumn);
    applyFilters(newSortColumn);
    console.log("New Sort Column", newSortColumn)
  }
  const applyFilters = (column) => {
    const queryParams = {
      sortBy: column.name,
      sortOrder: column.order
    };

    getGenres(queryString.stringify(queryParams))
      .then(res => {
        setGenreData(res.data.genres);
      })
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            {isLogin() ?
              <button className="btn btn-info mt-3" onClick={handleAuth}>Add Genre</button> : ''
            }
          </div>
          <div className="col-md-10">
            <h1 className="text-center">List of Genres</h1>
            <Link to="/movies"><button className="btn btn-info btn-block">Back to Movies</button></Link>

            {loading
              ? (
                <table class="table table-dark text-center">
                  <Table
                    columns={columns}
                    onSort={handleSort}
                    sortColumn={sortColumn}
                  />
                  <tbody>
                    {genreData.map(genre => (
                      <tr>
                        {isLogin()
                          ? (
                            <Link to={`/genres/${genre._id}`}>
                              <td>{genre.name}</td></Link>
                          ) : (
                            <td>{genre.name}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (<Skeleton count={7} height={25} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Genre
