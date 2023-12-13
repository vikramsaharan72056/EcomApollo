import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Login_User } from "../gqlops/mutation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loginUser, { loading, error, data }] = useMutation(Login_User);
  if (loading) return <h2>Logging in....</h2>;

  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
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
    loginUser({
      variables: {
        input: formData,
      },
    });
  };
  return (
    <div className="card" style={{ maxWidth: "500px", margin: "15%" }}>
      {error && <div className="card-panel red">{error.message}</div>}
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginLeft: "4%", marginRight: "4%", width: "85%" }}
          type="text"
          placeholder="email or username"
          name="identifier"
          onChange={handleChange}
        />
        <input
          style={{ marginLeft: "4%", marginRight: "4%", width: "85%" }}
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button
          style={{ marginLeft: "40%", marginTop: "4%", marginBottom: "1%" }}
          type="submit"
          className="btn blue"
        >
          Login
        </button><br/>
        <p>if you don't have an account already?
        then  <a style={{marginBottom: "1%",marginLeft:"2%",font:"40px"}}
              onClick={() => {
                navigate("/signup");
              }}
            >
              SignUp
            </a></p>
      </form>
    </div>
  );
};

export default Login;
