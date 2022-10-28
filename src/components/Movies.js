import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { useNavigate, useParams } from "react-router-dom";

const Movies = () => {
  const { movieList, totalPage, dynamicText, mediaType } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const pageClickHandler = async (selectedPage) => {
    let currPage = selectedPage.selected + 1;
    setPage(currPage);
    await movieClickHandler();
  };

  const movieClickHandler = async (movieObj) => {
    const id = movieObj.id;
    let videoType = "";
    if (movieObj.media_type) {
      videoType = movieObj.media_type;
    } else {
      videoType = mediaType;
    }
    setIsLoading(true);
    //console.log("movie obj", movieObj)
    navigate(`/id/${videoType}/${id}`);
  };

  console.log("movieList", movieList);
  return (
    <>
      <div className="trending-text"> {dynamicText}</div>

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
                  {/* <FontAwesomeIcon  onClick={ favClickhandler} className= {favIconStyle} icon={solid('heart')}  /> */}

                  <div className="movie-image">
                    {isLoading ? (
                      <div
                        className="loading"
                        style={{ width: "14vw", height: "45vh" }}
                      >
                        Loading..
                      </div>
                    ) : (
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}
                        className="card-img-top"
                        alt="..."
                      />
                    )}
                  </div>

                  <div className="movie-title">
                    {/* <p className='card-text movie-title'>{movieObj.original_title}</p> */}
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="fav-no-data">
            <span className="no-fav-msg">No Data Found</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Movies;
