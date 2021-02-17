import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { PencilSquare, FileEarmarkRichtext, Trash } from 'react-bootstrap-icons';
import { deleteMovie, getMovies } from '../services/movieService';
import { getCurrentUser, isLogin } from '../services/authService';
import Table from './Table';
import queryString from 'query-string';
import Pagination from './Pagination';

function Movies(props) {
  const [moviesData, setMoviesData] = useState([])
  const [loading, setloading] = useState(0)
  const [sortColumn, setSortColumn] = useState({
    name: '',
    order: ''
  });

  const [totalMovies, setTotalMovies] = useState(0);
  const [filters, setFilters] = useState({
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 5,
  });

  const columns = [
    { id: 1, name: 'title', label: 'Title' },
    { id: 2, name: 'genre', label: 'Genres' },
    { id: 3, name: 'dailyRentalRate', label: 'Rent Rate' },
    { id: 4, name: 'numberInStock', label: 'Stock' },
    { id: 5, name: 'action', label: "Actions" }
  ]

  useEffect(() => {
    getMovies(queryString.stringify(filters))
      .then(response => {
        setTotalMovies(response.data.totalMovies)
        setMoviesData(response.data.movies)
        setloading(1)
      })
      .catch(err => {
      })
  }, [filters])

  const handleSort = newSortColumn => {
    setFilters({ ...filters, sortBy: newSortColumn.name, sortOrder: newSortColumn.order })
    setSortColumn(newSortColumn);
  }
  const handleDelete = (id) => {
    deleteMovie(id).then(
      response => {
        setMoviesData(moviesData.filter(filterData => {
          return filterData._id !== id
        }))
      }
    ).catch(error => {
    })
  }

  const handlePageChange = number => {
    setFilters({ ...filters, page: number });
  }

  return (
    <div>
      <div className="container">
        <div className="rocw">
          <div className="col-md-12">
            <h1 className="text-center text-info">Movies List</h1>
            <Link to="/genres"><button className="btn btn-info btn-block">Back to Genres</button></Link>
            <ul>
            </ul>
            {loading
              ? (<table class="table table-dark align-middle vertical-align">
                <Table
                  columns={columns}
                  sortColumn={sortColumn}
                  onSort={handleSort}
                />
                <tbody>
                  {
                    moviesData.map(movie => (
                      <tr className="text-center">
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>{movie.numberInStock}</td>
                        <td>
                          {isLogin()
                            ? (< div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" 
                              aria-haspopup="true" aria-expanded="false"> Edit </button>

                              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <Link to={`/movies/details/${movie._id}`}> </Link>
                                
                                <Link to={`/movies/${movie._id}`}> <button className="dropdown-item" type="button"> <PencilSquare/> Update</button> </Link>
                                
                                {getCurrentUser().isAdmin ? <button class="dropdown-item btn btn-danger" 
                                onClick={() => handleDelete(movie._id)} type="button"><Trash/> Delete</button> : ''}
                              </div>
                              </div>) 
                              : (< div className="dropdown">
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" 
                               aria-haspopup="true" aria-expanded="false"> Edit </button>
                              
                              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <Link to={`/movies/details/${movie._id}`}>
                               <button className="dropdown-item btn btn-success" type="button"><FileEarmarkRichtext/> View</button>
                              </Link>
                              </div>
                            </div>)
                          }</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              ) : (<Skeleton count={7} height={25} />)
            }
            <Pagination
              limit={filters.limit}
              totalLength={totalMovies}
              onPageChange={handlePageChange}
              activePage={filters.page}
            />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Movies;
