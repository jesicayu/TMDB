import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import useInput from "../hooks/useInput";

const Login = () => {
  const navigate = useNavigate();
  const name = useInput();
  const lastName = useInput();
  const email = useInput();
  const password = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/register", {
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        navigate("/login");
        console.log(res);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="columns is-centered">
      <div className="column is-4 mt-6">
        <h2 className="title is-2 has-text-centered">REGISTER</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input className="input" type="text" {...name} />
          <br />
          <label>Last Name</label>
          <input className="input" type="text" {...lastName} />
          <br />
          <label>Email</label>
          <input className="input" type="text" {...email} />
          <br />
          <label>Password</label>
          <input className="input" type="password" {...password} />
          <br />
          <button className="button is-warning mt-4" type="submit">
            Register
          </button>
        </form>
        <Link to="/login">
          <p className="mt-3 has-text-primary-dark is-underlined">
            Already have an account? Log in here
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
