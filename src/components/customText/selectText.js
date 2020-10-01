import React, { useState, useEffect } from "react";
import "./selectText.css";
import Header from "../header/header";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

const SelectText = () => {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

  return (
    <animated.div style={animation} className={"TypingTest-page"}>
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
        }}
        className="TypingTest"
      >
        <Header />
      </div>
    </animated.div>
  );
};

export default SelectText;
