import React from "react";

import { Link } from "react-router-dom";

const Card = ({ id, attributes }) => {
  return (
    <div className="card" style={{ width: "150px", margin: "10px" }}>
      <Link to={`/product/${id}`}>
        <div className="card-image">
          <div>
            <img
              style={{ width: "100%", height: "100px" }}
              src={attributes.Image.data[0].attributes.url}
              alt="sample"
            />
            <div className="card-title black-text ">
              <h6>{attributes.Name}</h6>
            </div>
          </div>
        </div>
        <span className="card-content">
          <p className="truncate">{attributes.Description}</p>
          <h6 className="green-text">
            <b>Price:</b>&nbsp;&nbsp; {attributes.Price}
          </h6>
        </span>
      </Link>
    </div>
  );
};

export default Card;
