import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Home() {
  const theme = useSelector((state) => state.darkModeReducer);

  return (
    <animated.div className={theme ? "home-page-dark" : "home-page-light"}>
      <div className="Home">
        <Header text="Simple Typing Game" />
      </div>
    </animated.div>
  );
}

export default Home;
