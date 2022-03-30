import React from "react";
import { useSelector } from "react-redux";

// Layouts
import Qwerty from "./layouts/qwerty";
import Dvorak from "./layouts/dvorak";
import Colemak from "./layouts/colemak";

const Keyboard = () => {
  const keyboardLayout = useSelector((state) => state.selectKeyboardLayout);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );

  if (!keyboardOnScreen) return null;

  if (keyboardLayout === "QWERTY") return <Qwerty />;
  if (keyboardLayout === "DVORAK") return <Dvorak />;
  if (keyboardLayout === "COLEMAK") return <Colemak />;
  return <Qwerty />;
};

export default Keyboard;
