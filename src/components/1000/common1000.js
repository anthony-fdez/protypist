import React from "react";
import "./common1000.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Common1000() {
  const theme = useSelector((state) => state.darkModeReducer);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={animation}
      className={theme ? "common1000-page-dark" : "common1000-page-light"}
    >
      <div className={"Common1000"}>
        <Header text="Type the 1000 most common words in the English language." />
      </div>
    </animated.div>
  );
}

export default Common1000;
