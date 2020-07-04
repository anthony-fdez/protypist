import React from "react";
import "./quotes.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Quotes() {
  const theme = useSelector((state) => state.darkModeReducer);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={animation}
      className={theme ? "Quotes-page-dark" : "Quotes-page-light"}
    >
      <div className="Quotes">
        <Header text="Type a Random Quote" />
      </div>
    </animated.div>
  );
}

export default Quotes;
