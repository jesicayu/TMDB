import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { truncate } from "../utils/auxFunc";

const Card = ({
  user,
  item,
  type,
  addToFavorites,
  deleteFromFavorites,
  favorites,
}) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500/";
  const placeholderImg =
    "https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg";

  const isFavorite = (item) => {
    return favorites.find((favorite) => favorite.mediaId === item.id);
  };

  // to determine whether the clicked media goes to movies or shows
  const whichType = (item) => {
    if (item.name) {
      return "shows";
    } else {
      return "movies";
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <Link to={`/${type ? type : whichType(item)}/${item.id}`}>
          <figure className="image is-2by3">
            <img
              src={
                item.poster_path ? IMG_URL + item.poster_path : placeholderImg
              }
              alt="Media poster"
            />
          </figure>
        </Link>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <div className="columns">
              <div className="column is-two-thirds">
                <p className="title is-4">{item.title || item.name}</p>
              </div>

              <div className="column is-one-third">
                <button
                  className="button is-ghost "
                  onClick={
                    isFavorite(item)
                      ? () => deleteFromFavorites(item)
                      : () => addToFavorites(item)
                  }
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="2x"
                    style={
                      user.email && isFavorite(item)
                        ? { color: "crimson" }
                        : { color: "lightblue" }
                    }
                  />
                </button>
              </div>
            </div>
            <p className="subtitle is-6">
              {item.release_date || item.first_air_date}
            </p>
            <p>{truncate(item.overview)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
