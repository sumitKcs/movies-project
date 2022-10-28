import React from "react";
import { useContext } from "react";
import ReactPaginate from "react-paginate";
import { AppContext } from "../context/Context";

const Pagination = () => {
  const { totalPage, setPage } = useContext(AppContext);

  const pageClickHandler = (selectedPage) => {
    const currPage = selectedPage.selected + 1;
    setPage(currPage);
    console.log("page: no", currPage);
  };
  return (
    <>
      <div className="pagination-container">
        <ReactPaginate
          breakLabel=".."
          nextLabel=">>"
          onPageChange={pageClickHandler}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          pageCount={totalPage}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
        />
      </div>
    </>
  );
};

export default Pagination;
