import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import Header from "../header/header";

function Home() {
  return (
    <div className="home-page">
      <div className="Home">
        <Header text="Simple Typing Game" />
      </div>
    </div>
  );
}

export default Home;
