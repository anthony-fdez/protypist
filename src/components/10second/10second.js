import React from "react";
import "./10second.css";
import Header from "../header/header";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Typing10Second() {
  const theme = useSelector((state) => state.darkModeReducer);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  return (
    <animated.div
      style={animation}
      className={
        theme ? "Typing10Second-page-dark" : "Typing10Second-page-light"
      }
    >
      <div className={"Typing10Second"}>
        <Header text="10second Game" />
      </div>
    </animated.div>
  );
}

export default Typing10Second;
