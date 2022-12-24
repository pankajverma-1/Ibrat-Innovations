import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../../Components/features/Cart/Cart';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.Cart.cart);

  const updateCart = async (item, quantity) => {
    dispatch(CART_ADD_ITEM({ ...item, quantity }));
  };

  const deleteItem = async (item) => {
    dispatch(CART_REMOVE_ITEM(item));
  };

  return (
    <>
      <div className="h1 text-white my-3">Shopping Cart</div>
      <div className="row text-white">
        <div className="col-12 col-lg-8 pe-lg-5 my-1 my-lg-0">
          {cartItem.length === 0 ? (
            <h1>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </h1>
          ) : (
            cartItem.map((item) => (
              <div>
                <div className="border border-dark rounded-2 row my-2">
                  <div className="col-5">
                    <img
                      src={item.image.url}
                      className="card-img-top rounded-2"
                      alt={item.image.url}
                      style={{
                        width: '100px',
                        height: '75px',
                        objectFit: 'cover',
                      }}
                    />
                    <span className="h6 ms-2">{item.name}</span>
                  </div>
                  <div className="col-3 d-flex align-items-center justify-content-center">
                    <AddCircleOutlineIcon
                      onClick={() => {
                        updateCart(item, item.quantity + 1);
                      }}
                      className=" btn-primary rounded-circle icon"
                    />
                    <span className="mx-2">{item.quantity}</span>
                    <RemoveCircleOutlineIcon
                      onClick={() =>
                        item.quantity == 0
                          ? deleteItem(item)
                          : updateCart(item, item.quantity - 1)
                      }
                      className=" btn-primary rounded-circle icon"
                    />
                  </div>
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <strong>&#8377;{item.price}</strong>
                  </div>
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <DeleteOutlineIcon
                      onClick={() => deleteItem(item)}
                      className=" btn-primary rounded-circle icon"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-12 col-lg-4 my-1 my-lg-0">
          <div className="border border-dark rounded-2 p-3">
            <h3>
              Subtotal ({cartItem.reduce((a, c) => a + c.quantity, 0)} items) :
              &#8377;
              {cartItem.reduce((a, c) => a + c.price * c.quantity, 0)}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
