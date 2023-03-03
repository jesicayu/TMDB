import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post("api/users/logout")
      .then(() => {
        setUser({});
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <nav className="navbar has-background-info-dark">
      <div className="navbar-menu">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <h3 className="navbar-item has-text-white has-text-weight-semibold is-size-3">
              TMDB
            </h3>
          </Link>
          <Link to="/movies">
            <h3 className="navbar-item has-text-white">MOVIES</h3>
          </Link>
          <Link to="/shows">
            <h3 className="navbar-item has-text-white">TV SHOWS</h3>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="buttons">
            {user.email ? (
              <>
                <Link to="/allusers" className="pr-4">
                  <button className="button is-warning">
                    <FontAwesomeIcon icon={faUsers} />
                  </button>
                </Link>
                <Link to="/favorites">
                  <button className="button navbar-item is-danger is-inverted has-text-weight-semibold mr-4">
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ padding: "0.5rem" }}
                    ></FontAwesomeIcon>
                    {`${user.name}'s favorites`}
                  </button>
                </Link>
                <button
                  className="button is-info is-light mr-2"
                  onClick={handleLogout}
                >
                  LOG OUT
                </button>{" "}
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="button is-primary is-light mr-2">
                    LOG IN
                  </button>
                </Link>
                <Link to="/register">
                  <button className="button is-info is-light mr-2">
                    REGISTER
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
