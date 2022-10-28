import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { FiSearch } from "react-icons/fi";

// const SEARCH_URL = `https://api.themoviedb.org/3/search/multi?api_key=e229afd722b6ee38525d46e0b317f72b&language=en-US&query=doctor&page=1`;
const Search = () => {
  const { setSearchValue, setToShow } = useGlobalContext();
  const [inputValue, setInputValue] = useState("");

  const onChangehandler = (e) => {
    let val = e.target.value;

    setInputValue(val);
    // if (val.length >= 2) {
    setToShow("search");
    setSearchValue(val);
    // }
  };

  return (
    <>
      {" "}
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          className="searchBox"
          value={inputValue}
          type="text"
          placeholder="Money Heist, Spiderman"
          onChange={(e) => onChangehandler(e)}
        />
      </div>
    </>
  );
};

export default Search;
