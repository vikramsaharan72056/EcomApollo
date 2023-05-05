import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../gqlops/queries";
import { URL } from "../help";
import { useCart } from "react-use-cart";

const Product = () => {
  const { addItem } = useCart();
  const { pid } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });
  if (loading) return <h3>Loading....</h3>;
  if (error) {
    return error;
  }
  if (data) {
    console.log(data.product.data.attributes);
    const { Name, Price, Description, Image } = data.product.data.attributes;
    const addToCart = () => {
      addItem({
        id: pid,
        name: Name,
        price: Price,
        img: Image.data[0].attributes.url,
      });
    };

    return (
      <div className="container row">
        <div className=" col m10" style={{ marginTop: "5px" }}>
          <img
            style={{ width: "100%", height: "60%" }}
            src={Image.data[0].attributes.url}
            alt="sample"
          />
          <h3>{Name}</h3>
          <h4 className="green-text">Price:&nbsp;&nbsp;Rs.{Price}</h4>
          <h6 style={{ margin: "5%" }}>{Description}</h6>
          <button
            className="btn"
            style={{
              marginLeft: "35%",
              marginBottom: "2%",
              textSizeAdjust: "auto",
              width: "150px",
              fontSize: "15px",
            }}
            onClick={() => {
              addToCart();
              alert("Added to Cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
};

export default Product;
