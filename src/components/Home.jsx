import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import Grid from "./Grid";

const Home = ({ user, setFavorites, favorites }) => {
  const [selectedMedia, setSelectedMedia] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [trending, setTrending] = useState([]);
  const search = useInput();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    axios
      .get("api/home")
      .then((response) => {
        setTrending(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMedia) return;
    axios
      .get(`api/${selectedMedia}/search/${search.value}`)
      .then((response) => {
        // setSelectedMedia("");
        navigate(`/search`);
        setSearchResult(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedMedia(e.target.innerHTML);
  };

  return (
    <>
      <div>
        <h1 className="title is-1 has-text-centered m-6">
          Welcome to the Movie Database!
        </h1>
        <div className="columns is-centered">
          <div className="column is-11">
            <form onSubmit={handleSubmit}>
              <div className="columns">
                <div className="column is-half">
                  <label className="label my-2">
                    Search for your favorite movies or shows
                  </label>
                </div>
                <div className="column is-half has-text-right">
                  <button
                    className={`button is-primary  ${
                      selectedMedia === "movies" ? "is-active" : "is-outlined"
                    }`}
                    // has to have type button otherwise this will trigger the search
                    type="button"
                    onClick={handleClick}
                  >
                    movies
                  </button>
                  <button
                    className={`button is-link  ${
                      selectedMedia === "shows" ? "is-active" : "is-outlined"
                    }`}
                    type="button"
                    onClick={handleClick}
                  >
                    shows
                  </button>
                </div>
              </div>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    {...search}
                    className="input "
                    type="text"
                    placeholder={`Search ${selectedMedia}`}
                  />
                </div>
                <div className="control">
                  <button
                    className="button is-warning"
                    style={{ paddingLeft: "2em", paddingRight: "2em" }}
                    disabled={selectedMedia ? false : true}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Grid
        media={pathname === "/" ? trending : searchResult}
        type={selectedMedia}
        user={user}
        setFavorites={setFavorites}
        favorites={favorites}
      />
    </>
  );
};
export default Home;
