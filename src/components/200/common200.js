import React from "react";
import "./common200.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Common200() {
  const theme = useSelector((state) => state.darkModeReducer);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={animation}
      className={theme ? "common200-page-dark" : "common200-page-light"}
    >
      <div className={"Common200"}>
        <Header text="Type the 200 most common words in the English language." />
      </div>
    </animated.div>
  );
}

export default Common200;
