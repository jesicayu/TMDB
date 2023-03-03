import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "./Grid";

const Favorites = ({ favorites, user, setFavorites }) => {
  const [favoritedMovies, setFavoritedMovies] = useState([]);
  const [favoritedShows, setFavoritedShows] = useState([]);
  const arrayMovies = favorites.filter((item) => item.mediaType === "movies");
  const arrayShows = favorites.filter((item) => item.mediaType === "shows");

  useEffect(() => {
    const moviesPromise = arrayMovies.map((item) => {
      return axios
        .get(`api/movies/${item.mediaId}`)
        .then((response) => response.data);
    });

    Promise.all(moviesPromise).then((resolvedMovies) =>
      setFavoritedMovies(resolvedMovies)
    );
    const showsPromise = arrayShows.map((item) => {
      return axios
        .get(`api/shows/${item.mediaId}`)
        .then((response) => response.data);
    });

    Promise.all(showsPromise).then((resolvedShows) =>
      setFavoritedShows(resolvedShows)
    );
  }, [favorites]);

  return (
    <div>
      <h1 className="is-size-1 m-6">YOUR FAVORITE MOVIES</h1>
      <Grid
        media={favoritedMovies || []}
        favorites={favorites}
        user={user}
        setFavorites={setFavorites}
      ></Grid>
      <h1 className="is-size-1 m-6">YOUR FAVORITE SHOWS</h1>
      <Grid
        media={favoritedShows || []}
        favorites={favorites}
        user={user}
        setFavorites={setFavorites}
      ></Grid>
    </div>
  );
};

export default Favorites;
