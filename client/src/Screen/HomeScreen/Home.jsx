import React, { useEffect } from 'react';
import './Home.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  FETCH_FAIL,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from '../../Components/features/FetchQu/Fetch_Query';
import axios from 'axios';
import Loading from '../../Components/loading/Loading';
import { CART_ADD_ITEM } from '../../Components/features/Cart/Cart';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.FetchQuery.value
  );

  const { cartItem } = useSelector((state) => state.Cart.cart);

  const addCard = (product, productId) => {
    const existProduct = cartItem.find((x) => x._id === productId);
    const quantity = existProduct ? existProduct.quantity + 1 : 1;
    dispatch(CART_ADD_ITEM({ ...product, quantity }));
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(FETCH_REQUEST());
      try {
        const { data } = await axios.get('/api/products');
        // console.log(data);
        if (data) {
          dispatch(FETCH_SUCCESS(data));
        }
      } catch (error) {
        dispatch(FETCH_FAIL(error));
      }
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        alert(error)
      ) : (
        <div>
          <div className="text-center h1 text-white py-3">Products</div>
          <div className="row">
            {products.map((item) => (
              <div
                className="col-12 col-md-6 col-lg-4 col-xl-3 my-2"
                key={item._id}
              >
                <div className="card">
                  <img
                    src={item.image.url}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className="mb-2">
                      Price : <strong>&#8377;{item.price}</strong>
                    </div>
                    <div
                      className="btn btn-primary"
                      onClick={() => addCard(item, item._id)}
                    >
                      Add Cart
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
