import React from "react";
import "./quotes.css";
import Header from "../header/header";
import { useSelector } from "react-redux";

function Quotes() {
  const theme = useSelector((state) => state.darkModeReducer);

  return (
    <div className={theme ? "Quotes-page-dark" : "Quotes-page-light"}>
      <div className="Quotes">
        <Header text="Type a Random Quote" />
      </div>
    </div>
  );
}

export default Quotes;
