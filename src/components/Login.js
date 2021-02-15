import React, { useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { login } from '../services/authService';
import Input from './Input';

function Login() {
  const history = useHistory()

  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(0)
  const [errors, setErrors] = useState({})

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const validator = () => {
    const errors = {}
    if (!data.email) {
      errors['email'] = "Email is Required"
    }
    if (!data.password) {
      errors['password'] = "Password is Required"
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
          localStorage.setItem('token', JSON.stringify(res.data))
          window.location.href = '/'
        })
        .catch(ex => {
          setErrors({ ...errors, server: ex.response.data })
          console.log(ex.response.data)
        })
    }
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <h1 className="text-center text-info">Login</h1>
            {errors.server ? <div class="alert alert-danger text-center" role="alert">
              {errors.server}
            </div> : ''
            }
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className={errors.email ? "form-control border border-danger" : "form-control"}
                error={errors.email} />
              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="Enter password "
                name="password"
                error={errors.password}
                onChange={handleChange}
                value={data.password}
                className={errors.password ? "form-control border border-danger" : "form-control"} />
              {loading
                ? <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />Signing In...
                </Button> : <input type="submit" className="form-control" class="btn btn-info btn-block" />}
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login;
