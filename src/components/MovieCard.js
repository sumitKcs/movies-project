import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import loadingImage from "../assets/Fading_circles.gif";
import Loader from "./Loader";

const MovieCard = () => {
  const { movieList, mediaType } = useGlobalContext();
  const [imageDisplay, setImageDisplay] = useState("none");
  const [loaderDisplay, setLoaderDisplay] = useState("flex");

  const handleImg = () => {
    setImageDisplay("flex");
    setLoaderDisplay("none");
    console.log("img loaded");
  };
  const navigate = useNavigate();

  const movieClickHandler = async (movieObj) => {
    const id = movieObj.id;
    let videoType = "";
    if (movieObj.media_type) {
      videoType = movieObj.media_type;
    } else {
      videoType = mediaType;
    }
    //console.log("movie obj", movieObj)
    navigate(`/id/${videoType}/${id}`);
  };

  return (
    <div className="movie-container">
      {movieList.length > 0 ? (
        movieList.map((movieObj, index) => {
          if (movieObj.poster_path) {
            return (
              <div
                className="movie-card"
                key={index}
                onClick={() => movieClickHandler(movieObj)}
              >
                <div
                  className="movie-image"
                  style={{ display: `${imageDisplay} ` }}
                >
                  <img
                    onLoad={() => handleImg()}
                    style={{ width: "100%", height: "100%" }}
                    src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div
                  style={{
                    display: ` ${loaderDisplay} `,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Loader />
                </div>

                <div className="movie-title">
                  {/* <p className='card-text movie-title'>{movieObj.original_title}</p> */}
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="loading-text">
          <img src={loadingImage} alt="loading" />
        </div>
      )}
    </div>
  );
};

export default MovieCard;
