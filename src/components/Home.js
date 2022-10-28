import React from "react";
import Footer from "./Footer";
import Movies from "./Movies";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import Search from "./Search";
import TopBar from "./TopBar";

const Home = () => {
  return (
    <>
      <Navbar />
      <TopBar />
      <Search />
      <Movies />
      <Pagination />
      <Footer />
    </>
  );
};

export default Home;
