import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useIsTyping = () => {
  const dispatch = useDispatch();

  //   const isTyping = useSelector((state) => state.isTypingReducer);
  const [isTyping, setIsTyping] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler() {
    setKeyPressed(true);
  }
  const upHandler = () => {
    setKeyPressed(false);
  };

  useEffect(() => {
    setIsTyping(true);

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 5000);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    dispatch({
      type: "SET_IS_TYPING",
      payload: isTyping,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyPressed]);

  return keyPressed;
};
