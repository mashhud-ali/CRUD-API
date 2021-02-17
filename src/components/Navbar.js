import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, isLogin, logout } from '../services/authService';
import '../App.css';

function Navbar() {
  const handleLogout = () => {
    window.location.href = "/";
    logout()
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="mt-2 navbar navbar-expand-lg navbar-expand-sm navbar-expand-xs navbar-light bg-info">
              <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav">

                  <Link to="/register">
                    <li className="nav-item active">
                      <a className="nav-link mr-5">Register User<span className="sr-only">(current)</span></a>
                    </li>
                  </Link>

                  <Link to="/movies">
                    <li className="nav-item active">
                      <a className="nav-link mr-5">Movie List<span className="sr-only">(current)</span></a>
                    </li>
                  </Link>

                  <Link to="/genres">
                    <li className="nav-item active">
                      <a className="nav-link mr-5">Genres<span className="sr-only">(current)</span></a>
                    </li>
                  </Link>

                  {isLogin()
                    ?
                    <button onClick={handleLogout} className="btn btn-secondary float-end">Sign Out</button>
                    :
                    <Link to="/loginuser">
                      <li className="nav-item active">
                        <a className="nav-link" className=" btn btn-primary"> Sign  In <span className="sr-only">(current)</span></a>
                      </li>
                    </Link>
                  }
                </ul>

                {getCurrentUser() && <div><h5 className="text-light ml-5 align-right mb-0" >{getCurrentUser().name} </h5></div>}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
