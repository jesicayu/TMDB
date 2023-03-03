import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        setUser(response.data);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="columns is-centered">
      <div className="column is-4 mt-6">
        <h2 className="title is-2 has-text-centered">LOG IN</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input className="input" type="text" {...email} />
          <br />
          <label>Password</label>
          <input className="input" type="password" {...password} />
          <br />
          <button className="button is-warning mt-4" type="submit">
            Log In
          </button>
        </form>
        <Link to="/register">
          <p className="mt-3 has-text-primary-dark is-underlined">
            Don't have an account? Register here
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
