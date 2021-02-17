import React, { useState } from 'react';
import { register } from '../services/authService';
import Input from './Input';

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const changeHandler = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const validator = () => {
    const errors = {}
    if (!data.name) {
      errors['name'] = "Name Required"
    }
    if (!data.email) {
      errors['email'] = "Email Required"
    }
    if (!data.password) {
      errors['password'] = "Password Required"
    }
    return Object.keys(errors).length === 0 ? null : errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validator();
    setErrors(errors || {})
    if (!errors) {
      register(data)
        .then(res => {
          console.log(res);
          res.data.token && localStorage.setItem(res.data.token);
        }).catch(ex => {
          setErrors({ ...errors, serverError: ex.response.data })
        })
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-6">
            <h2 className="mt-3 text-center text-primary">Register User</h2>
            {errors.serverError
              ? (<div class="alert alert-info text-center" role="alert">
                {errors.serverError}
              </div>) : ""}

            <form onSubmit={handleSubmit}>
              <Input
                label="Name"
                id="name"
                name="name"
                value={data.name}
                onChange={changeHandler}
                className={errors.name ? "border border-danger form-control" : "form-control"}
                error={errors.name}
                placeholder="Enter Your Name"/>

              <Input
                label="Email ID"
                id="email"
                name="email"
                type="email"
                value={data.email}
                className={errors.email ? "border border-danger form-control" : "form-control"}
                onChange={changeHandler}
                error={errors.email}
                placeholder="Enter Email Address"/>

              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                value={data.password}
                className={errors.password ? "border border-danger form-control" : "form-control"}
                onChange={changeHandler}
                error={errors.password}
                placeholder="Password" />
              <button type="submit" class="btn btn-info btn-block">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
