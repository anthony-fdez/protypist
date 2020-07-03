import React from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import changeMode from "../../action/changeTheme";
import SideMenu from "../SideMenu/SideMenu";

function Home() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.darkModeReducer);

  return (
    <div className="home-page">
      <SideMenu />
      <div className="Home">
        <h1>Home page</h1>
        <button onClick={() => dispatch(changeMode())}>Mode</button>
      </div>
    </div>
  );
}

export default Home;
