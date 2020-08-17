import React from "react";
import "./ladderboard.css";

import { useSelector, useDispatch } from "react-redux";

function Ladderboard(props) {
  const dispatch = useDispatch();
  const isLadderBoardOpen = useSelector((state) => state.openLadderBoardMenu);

  return (
    <div className={props.isShown ? "Ladderboard-shown" : "Ladderboard-hidden"}>
      <div className="ladderboard-header">
        <h1>This is the ladderboard div</h1>
        <i
          onClick={() => {
            dispatch({
              type: "TOGGLE_OPENING_LADDERBOARD_MENU",
            });
          }}
          className="fas fa-times fa-2x close-icon"
        ></i>
      </div>
    </div>
  );
}

export default Ladderboard;
