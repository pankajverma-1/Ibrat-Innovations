import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LOGIN, LOGOUT } from '../features/loginStatus/IsLogin';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const { cartItem } = useSelector((state) => state.Cart.cart);
  const { isLogin, data } = useSelector((state) => state.LoginStatus.value);

  const logout = async () => {
    const { data } = await axios.get('/api/user/logout');
    if (data) {
      alert('Logout successfully');
      dispatch(LOGOUT());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/auth');
      if (data) {
        dispatch(LOGIN(data));
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [dispatch]);

  return (
    <div>
      <div className={click ? 'main-container' : ''} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Shop
            <i className="fa fa-code"></i>
          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {isLogin ? (
              <>
                <li className="nav-item">
                  <div className="btn disabled btn-light">{data.name}</div>
                </li>
                <div className="nav-item">
                  <div className="btn  btn-primary" onClick={logout}>
                    Log Out
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/register"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    // activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Log In
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                to="/cart"
                // activeclassname="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Cart
                <span className="avatar ms-1">
                  {cartItem.length <= 0 ? '' : cartItem.length}
                </span>
              </Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <MenuIcon /> : <MenuIcon />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
