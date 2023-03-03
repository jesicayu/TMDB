import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "./Grid";

const Content = ({ user, setFavorites, favorites }) => {
  const media = useParams().type;
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    axios
      .get(`api/${media}/main`)
      .then((response) => {
        setPopular(response.data);
      })
      .catch((error) => console.error(error));
  }, [media]);

  return (
    <div>
      <h1 className="is-size-1 m-6">{`Top rated ${media}`}</h1>
      <Grid
        media={popular}
        user={user}
        setFavorites={setFavorites}
        favorites={favorites}
      />
    </div>
  );
};

export default Content;
