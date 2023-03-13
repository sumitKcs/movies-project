import React from "react";
import MovieCard from "./MovieCard";
import Shimmer from "./Shimmer";
import { useGlobalContext } from "../context/Context";

const Movies = () => {
  const { movieList, dynamicText } = useGlobalContext();

  return (
    <>
      <div className="trending-text"> {dynamicText}</div>
      {movieList?.length > 0 ? <MovieCard /> : <Shimmer />}
    </>
  );
};

export default Movies;
