import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/Context";

//get genere list of movie and tv
// const Tv_Genre_List_URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=e229afd722b6ee38525d46e0b317f72b`

// const Movie_Genre_List_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=e229afd722b6ee38525d46e0b317f72b`

//get movie/tv list according to provided genre id
// const Movie_Genre_Search_URL = `https://api.themoviedb.org/3/discover/movie?api_key=e229afd722b6ee38525d46e0b317f72b&with_genres=27&page=1`

// const Tv_Genre_Search_URL = `https://api.themoviedb.org/3/discover/tv?api_key=e229afd722b6ee38525d46e0b317f72b&with_genres=10759&page=3`

const SearchGenre = () => {
  const { setGenrePage, setToShow, setMediaType } = useGlobalContext();
  const { media_type, genre_id, genre_name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (genre_name) {
      setMediaType(media_type);
      setGenrePage({
        media_type: media_type,
        genre_id: genre_id,
        genre_name: genre_name,
      });
      setToShow("genre");
      navigate(`/${genre_name}`);
    }
  });

  return <div>SearchGenre</div>;
};

export default SearchGenre;
