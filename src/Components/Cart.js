import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import CheckOut from "./Checkout";

const Cart = () => {
  const [Checkout, setCheckout] = useState(false);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { isEmpty, items, cartTotal, removeItem } = useCart();
  if (Checkout) {
    return (
      <div className="container">
        <h4>Payment Page</h4>
        <CheckOut /> <br />
        <button
          className="btn red"
          onClick={() => {
            setCheckout(false);
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
  if (isEmpty) return <h2>Your Cart is Empty</h2>;

  return (
    <div>
      <div className="container row">
        <ul className="collection col m8 ">
          {items.map((item) => {
            return (
              <li className="collection-item avatar">
                <img src={`http://localhost:1337${item.img}`} alt="sample" className="circle" />
                <span className="title">{item.name}</span>
                <div>
                  <p className="green-text">
                    Price:- {item.price} X {item.quantity} = {item.itemTotal}
                  </p>
                </div>

                <i
                  className=" secondary-content material-icons red-text"
                  onClick={() => removeItem(item.id)}
                >
                  remove_circle
                </i>
              </li>
            );
          })}
        </ul>
        <div
          className="col m3 offset-m1"
          style={{ position: "sticky", top: "2px", right: "2px" }}
        >
          <h5>Total Price:- {cartTotal}</h5>
          {jwt ? (
            <button
              className="btn blue"
              onClick={() => {
                setCheckout(true);
              }}
            >
              Checkout
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                navigate("/login");
              }}
            >
              Please login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
