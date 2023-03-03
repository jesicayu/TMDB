import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { rankingColor } from "../utils/auxFunc";

const Header = () => {
  const { type, id } = useParams();
  const [selectedMedia, setSelectedMedia] = useState({});
  const popularityColor = rankingColor(selectedMedia.vote_average);

  useEffect(() => {
    axios.get(`/api/${type}/${id}`).then((response) => {
      setSelectedMedia(response.data);
      console.log(response.data);
    });
  }, [id]);

  const IMG_URL = "https://image.tmdb.org/t/p/w500/";
  const placeholderImg =
    "https://marketplace.canva.com/EAE9OZ4Eh9o/1/0/1131w/canva-black-minimalist-coming-soon-poster-rmN33IHdOEM.jpg";
  return (
    <div className="columns has-background-link-light">
      <div className="column is-one-third">
        <figure className="image is-4by4 m-6 pl-4">
          <img
            src={
              selectedMedia.poster_path
                ? IMG_URL + selectedMedia.poster_path
                : placeholderImg
            }
            alt="Media poster"
          />
        </figure>
      </div>
      <div className="column">
        <div className="mt-6">
          <h1 className="title">
            {selectedMedia.title || selectedMedia.name || null}
          </h1>
          <div className="columns mr-6">
            <div className="column is-half">
              <p className="subtitle is-size-6">
                {selectedMedia.release_date || selectedMedia.first_air_date}
              </p>
            </div>
            <div className="column is-half">
              <p className="has-text-primary-dark has-text-right is-uppercase has-text-weight-semibold mr-6 pr-6">
                {selectedMedia.genres && selectedMedia.genres.length
                  ? selectedMedia.genres[0].name
                  : null}
              </p>
            </div>
          </div>

          <br />
          <p className={`has-text-weight-bold is-size-4 ${popularityColor}`}>
            {selectedMedia.vote_average
              ? selectedMedia.vote_average.toFixed(1)
              : null}
          </p>
          <p className="has-text-weight-bold">Overview</p>
          <p className="mr-6">{selectedMedia.overview}</p>
          <br />
          <p className="has-text-weight-bold">
            Budget: {selectedMedia.budget}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
