import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Flipkart
        </Link>
        <ul id="nav-mobile" className="right ">
          {jwt ? (
            <>
              <li>
                <button
                  className="btn red"
                  style={{ marginLeft: "5px" }}
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    navigate("/login");
                  }}
                >
                  LogOut
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          )}
          {/* 
          <li>
            <Link to="/product/:pid">Product</Link>
          </li> */}
          <li>
            <Link to="/cart">
              <i className="material-icons large">add_shopping_cart</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
