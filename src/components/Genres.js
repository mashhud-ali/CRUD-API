import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { getGenres } from '../services/genreService';
import { isLogin } from '../services/authService';
import Table from './Table';
import queryString from 'query-string';
import Pagination from './Pagination';
// Not working properly
// import { usePopper } from 'react-popper';

function Genres() {
  const [genreData, setGenreData] = useState([])
  const [loading, setloading] = useState(0)

  //Sending parameters in URL
  const { sortBy, sortOrder, page } = queryString.parse(window.location.search);
  console.log( { sortBy, sortOrder, page })

  //Addition for Pagination
  const history = useHistory();
  const [totalGenres, setTotalGenres] = useState(0);
  const [filters, setFilters] = useState({
  //comparing and sorting accordingly if the parameters are found after parsing it
    sortBy: sortBy || '',
    sortOrder: sortOrder || '',
    page: page ? +page : 1,
    limit: 5,
  });

//   const [referenceElement, setReferenceElement] = useState(null);
//   const [popperElement, setPopperElement] = useState(null);
//   const [arrowElement, setArrowElement] = useState(null);
//   const {styles, attributes} = usePopper(referenceElement, popperElement, {
//       modifiers: [{ name: 'arrow', options: {element: arrowElement} }],
//   });

  const columns = [
    { id: 1, name: 'name', label: 'Genre' }
  ]

  useEffect(() => {
    getGenres(queryString.stringify(filters))
      .then(res => {
        setTotalGenres(res.data.totalGenres);
        setGenreData(res.data.genres);
        setloading(1)
      })
      .catch(err => {
      })
  }, [filters])

  const handleAuth = () => {
    isLogin() ? history.push('/genres/new') : history.push('/loginuser')
  }

  const handleSort = ({ name, order }) => {
    //anything that will be returned by queryString will be assigned to oldParams
    const oldParams = queryString.parse(window.location.search);
    const searchParams  = queryString.stringify({ ...oldParams, sortBy: name, sortOrder: order })
    history.push(`/genres?${searchParams}`);
    setFilters({ ...filters, sortBy: name, sortOrder: order })
    // applyFilters(newSortColumn)
    applyFilters({ ...filters, sortBy: name, sortOrder: order })
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

  const handlePageChange = number => {
    const oldParams = queryString.parse(window.location.search);
    const searchParams = queryString.stringify({ ...oldParams,  page: number});
    history.push(`/genres?${searchParams}`);
    setFilters({ ...filters, page: number });
    // applyFilters({ ...filters, page: number });
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {isLogin() ?
              <button className="mt-3 btn btn-block btn-info" onClick={handleAuth}>Add Genre</button> : ''
            }
          </div>
          <div className="col-md-12">
            <h1 className="mt-3 text-center text-info">Genres List</h1>
            <Link to="/movies"><button className="mt-3 btn btn-info btn-block">Back to Movies</button></Link>
            <ul> </ul>

            {/* Not working properly
            <div ref={setPopperElement} style={styles.popper} {...attributes.popper}> Popper element
            <div ref={setArrowElement} style={styles.arrow} />
            </div> */}
            {loading ? (
              <table class="table table-dark align-middle text-center vertical-align">
                <Table
                  columns={columns}
                  sortColumn={{ name: filters.sortBy, order: filters.sortOrder }}
                  onSort={handleSort}
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
              <Pagination
              limit={filters.limit}
              totalLength={totalGenres}
              onPageChange={handlePageChange}
              activePage={filters.page}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Genres;
