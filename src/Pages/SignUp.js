import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SignUp_User } from "../gqlops/mutation";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signupUser, { loading, error, data }] = useMutation(SignUp_User);
  if (loading) return <h2>Signing up....</h2>;

  if (data) {
    localStorage.setItem("jwt", data.register.jwt);
    navigate("/");
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        input: formData,
      },
    });
  };
  return (
    <div className="card" style={{ maxWidth: "500px", margin: "15%" }}>
      {error && <div className="card-panel red">{error.message}</div>}
      <h2 style={{ textAlign: "center" }}>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginLeft: "4%", marginRight: "4%", width: "85%" }}
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          style={{ marginLeft: "4%", marginRight: "4%", width: "85%" }}
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          style={{ marginLeft: "4%", marginRight: "4%", width: "85%" }}
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button
          style={{ marginLeft: "40%", marginTop: "4%", marginBottom: "4%" }}
          type="submit"
          className="btn blue"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
