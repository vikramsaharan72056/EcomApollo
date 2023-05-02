import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { URL } from "../help";
const stripePromise = loadStripe(
  "pk_test_51N2pUTSFyJqaFNVsOkWANSWmdbToBuOzjWH6suR2mAleABFSD0ggCs1XuPeBzWv9Kz7sR7RMeNc3v5f7nqz1TNKz00zAHygPOr"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paybutton, setPaybutton] = useState(true);
  const [formData, setFormData] = useState({});
  const { cartTotal, items, emptyCart } = useCart();
  const [payprocessing, setPayprocessing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const makePaymentRequest = async (allFormData) => {
    try {
      const res = await fetch(`${URL}/api/orders`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify(allFormData),
      });
      return res.json();
    } catch (err) {
      alert("payment failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (elements == null) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);
    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };
    setPayprocessing(true);
    await makePaymentRequest(allFormData);
    setPayprocessing(false);
    emptyCart();
  };

  if (payprocessing) return <h2>Payment is processing</h2>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="shippingAddress"
        placeholder="shippingAddress"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="city"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="state"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="pin"
        placeholder="pin code"
        onChange={handleChange}
        required
      />
      <CardElement
        onChange={(e) => {
          if (e.complete) {
            setPaybutton(false);
          } else {
            setPaybutton(true);
          }
        }}
      />
      <br />
      <button
        className="blue btn"
        type="submit"
        disabled={!stripe || !elements || paybutton}
      >
        Pay Now
      </button>
    </form>
  );
};

const CheckOut = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckOut;
