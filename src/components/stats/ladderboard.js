import React from "react";
import "./ladderboard.css";

import { useSelector, useDispatch } from "react-redux";

function Ladderboard(props) {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
  const isLadderBoardOpen = useSelector((state) => state.openLadderBoardMenu);

  return (
    <div
      className={
        props.isShown
          ? theme
            ? "Ladderboard-shown-dark"
            : "Ladderboard-shown-light"
          : theme
          ? "Ladderboard-hidden-dark"
          : "Ladderboard-hidden-light"
      }
    >
      <div className="ladderboard-header">
        <h2>Ladderboard</h2>
        <hr className={theme ? "white-hr" : "dark-hr"}></hr>

        <i
          onClick={() => {
            dispatch({
              type: "TOGGLE_OPENING_LADDERBOARD_MENU",
            });
          }}
          className="fas fa-times fa-2x close-icon mt-3 mr-3"
        ></i>
      </div>
    </div>
  );
}

export default Ladderboard;
