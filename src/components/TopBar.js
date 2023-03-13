import React, { memo, useState } from "react";
import Loader from "./Loader";

import { useGlobalContext } from "../context/Context";
const TopBar = () => {
  const [imageDisplay, setImageDisplay] = useState("none");
  const [loaderDisplay, setLoaderDisplay] = useState("flex");
  let movieData = useGlobalContext();
  let firstMovieArr = "";
  //console.log(movieData)
  if (movieData.topMovie) {
    firstMovieArr = movieData.topMovie[0];
  }

  const handleImg = () => {
    setImageDisplay("flex");
    setLoaderDisplay("none");
    console.log("img loaded");
  };

  if (!movieData?.movieList?.length > 0) {
    return (
      <div className="top-trending animate-pulse">
        <div
          className="top-trending-image-conatiner"
          style={{ backgroundColor: "#F5F3F3" }}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            className="topbar-movie-image"
            alt="topbar-movie"
          />
          <div
            className="topbar-trending-title"
            style={{
              width: "10rem",
              height: "1rem",
              backgroundColor: "#DEDBDA",
              marginBottom: ".5rem",
            }}
          ></div>
          <div
            className="topbar-trending-rank"
            style={{
              width: "10rem",
              height: "1rem",
              backgroundColor: "#DEDBDA",
            }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {movieData.topMovie && firstMovieArr ? (
        movieData.topMovie.map((movieObj, index) => {
          const firstMovie = movieObj.mydata;
          //console.log("map:", movieObj.mydata.original_title)
          return (
            <div className="top-trending" key={index}>
              <div className="top-trending-image-conatiner">
                <img
                  onLoad={() => handleImg()}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: `${imageDisplay} `,
                  }}
                  src={`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`}
                  className="topbar-movie-image"
                  alt="topbar-movie"
                />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: `${loaderDisplay} `,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="topbar-movie-image"
                  alt="topbar-movie"
                >
                  <Loader />
                </div>
                <div className="topbar-trending-title">
                  {firstMovie.original_title
                    ? firstMovie.original_title
                    : firstMovie.original_name}
                </div>
                <div className="topbar-trending-rank">Trending #1</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <center>
            {" "}
            <strong>Loading.....</strong>
          </center>{" "}
        </div>
      )}
    </>
  );
};

export default memo(TopBar);
