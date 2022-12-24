import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../Components/features/loginStatus/IsLogin';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    try {
      const { data, status } = await Axios.post('/api/users/login', {
        email,
        password,
      });

      if (data.error) {
        alert(data.error);
        return;
      }
      if (status === 200) {
        alert('login SuccessFully');
        dispatch(LOGIN(data));
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="h2 text-center text-white py-3">User Login</div>
      <div className="d-flex justify-content-center flex-column align-items-center">
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
        <div className="btn btn-primary" onClick={submitHandler}>
          Log In
        </div>
      </div>
    </>
  );
};

export default Login;
