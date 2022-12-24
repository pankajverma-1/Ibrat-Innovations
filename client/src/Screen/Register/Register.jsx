import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, cPassword } = userData;
    if (password !== cPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { data, status } = await Axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      console.log(data);
      if (status === 200) {
        navigate('/', { replace: true });
      }
      if (data.message) {
        alert('User Exist');
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h2 text-center text-white py-3">New User Register</div>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <div className="mb-3 formField">
          <label htmlFor="name" className="form-label">
            Enter your name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Enter Your name"
            onChange={handleChange}
            value={userData.name}
          />
        </div>
        <div className="mb-3 formField">
          <label htmlFor="email" className="form-label">
            Enter Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            value={userData.email}
          />
        </div>
        <div className="mb-3 formField">
          <label htmlFor="password" className="form-label">
            Enter password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={userData.password}
          />
        </div>
        <div className="mb-3 formField">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cPassword"
            className="form-control"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={userData.cPassword}
          />
        </div>
        <div className="btn btn-primary" onClick={submitHandler}>
          Register
        </div>
      </div>
    </>
  );
};

export default Register;
