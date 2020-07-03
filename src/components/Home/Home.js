import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import Header from "../header/header";
import { useSelector } from "react-redux";

function Home() {
  const theme = useSelector((state) => state.darkModeReducer);

  return (
    <div className={theme ? "home-page-dark" : "home-page-light"}>
      <div className="Home">
        <Header text="Simple Typing Game" />
      </div>
    </div>
  );
}

export default Home;
