import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { headingName } from "../utils/auxFunc";

import Card from "../commons/Card";

const Grid = ({ media, type, user, setFavorites, favorites }) => {
  const { pathname } = useLocation();

  const [showError, setShowError] = useState(false);

  const addToFavorites = (item) => {
    if (!user.email) {
      setShowError(true);
      return;
    }

    if (item.name) {
      type = "shows";
    } else {
      type = "movies";
    }

    axios
      .post("/api/favorites/add", {
        mediaId: item.id,
        mediaType: type,
        userEmail: user.email,
      })
      .then((response) => setFavorites([...favorites, response.data]))
      .catch((error) => console.error(error));
  };

  const deleteFromFavorites = (item) => {
    if (!user.email) {
      setShowError(true);
      return;
    }
    axios
      .delete(`/api/favorites/${item.id}`)
      .then(() => {
        const updatedFavorites = [...favorites].filter(
          (favorite) => favorite.mediaId !== item.id
        );
        setFavorites(updatedFavorites);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1 className="m-6 pl-2 is-size-3">{headingName(pathname)}</h1>
      {showError && (
        <div className="has-text-danger ml-6">
          <h3>You must be logged in to add or delete favorites</h3>
        </div>
      )}
      <div className="columns is-multiline layout m-6">
        {media.map((item, i) => (
          <div className="column is-3" key={i}>
            <Card
              user={user}
              item={item}
              type={type}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              favorites={favorites}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
