import React, { useState } from 'react';
import { login } from '../services/authService';
import { Spinner, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Input from './Input';
// import { Link } from 'react-router-dom';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(0)
  const [errors, setErrors] = useState({})
  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value })
  }
  const history = useHistory ();

  const validator = () => {
    const errors = {}
    if (!data.email) {
      errors['email'] = "Email Address Required"
    }
    if (!data.password) {
      errors['password'] = "Password Required"
    }
    return Object.keys(errors).length === 0 ? null : errors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errors = validator();
    setErrors(errors || {})
    if (!errors) {
      login(data)
        .then(res => {
          setLoading(1)
          localStorage.setItem('token', JSON.stringify(res.data));
          // history.push('/');
          window.location.href = '/'
        })
        .catch(ex => {
          setErrors({ ...errors, server: ex.response.data })
        })
    }
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h1 className="mt-3 text-center text-info">Login</h1>
            {errors.server ? <div class="alert alert-danger text-center" role="alert">
              {errors.server}
            </div> : ''
            }
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                id="email"
                placeholder="Enter Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                className={errors.email ? "form-control border border-danger" : "form-control"}
                error={errors.email} />
              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Enter Password"
                name="password"
                error={errors.password}
                onChange={handleChange}
                value={data.password}
                className={errors.password ? "form-control border border-danger" : "form-control"} />
              {loading
                ? <Button variant="primary" disabled>
                  <Spinner as="span" animation="grow"
                    size="sm" role="status" aria-hidden="true" />Signing In...
                </Button> : <input type="submit" className="form-control" class="btn btn-info btn-block"/>}
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login;
