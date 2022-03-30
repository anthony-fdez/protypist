import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useIsTyping = () => {
  const dispatch = useDispatch();

  const isTestRunning = useSelector((state) => state.isTestRunningReducer);

  const [isTyping, setIsTyping] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler() {
    setIsTyping(true);
    setKeyPressed(true);
  }
  const upHandler = () => {
    setKeyPressed(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 5000);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyPressed]);

  useEffect(() => {
    if (isTestRunning) {
      dispatch({
        type: "SET_IS_TYPING",
        payload: isTyping,
      });
    } else {
      dispatch({
        type: "SET_IS_TYPING",
        payload: false,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping, isTestRunning]);

  useEffect(() => {
    dispatch({
      type: "SET_IS_TYPING",
      payload: false,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyPressed]);
};
