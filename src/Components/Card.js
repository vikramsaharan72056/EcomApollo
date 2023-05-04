import React from "react";
import { URL } from "../help";
import { Link } from "react-router-dom";

const Card = ({ id, attributes }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="card" style={{ width: "250px", margin: "10px" }}>
        <div className="card-image">
          <img
            style={{ width: "250px", height: "200px" }}
            src={attributes.Image.data[0].attributes.url}
            alt="sample"
          />
        </div>
        <div className="card-content truncate black-text">
          <span className="card-title " style={{ marginLeft: "-15px" }}>
            <h4>{attributes.Name}</h4>
          </span>
          <h6>About:{attributes.Description}</h6>
          <h5>Price:&nbsp;&nbsp;Rs. {attributes.Price}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Card;
