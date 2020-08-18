import React from "react";
import "./ladderboard.css";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

function Ladderboard(props) {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkModeReducer);
  const isLadderBoardOpen = useSelector((state) => state.openLadderBoardMenu);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/wpm", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, []);

  const sortByWpm = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/wpm", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByHighest = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/highest", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByRaces = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/races", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortByTime = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/time", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  const sortBy10races = () => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/ladderboard/10races", {
          headers: headers,
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  };

  console.log(data);

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
      <div className="ladderboard-info">
        <h5 className="ladderboard-name-info">Name</h5>
        <h5 className="ladderboard-races-info">Races</h5>
        <h5 className="ladderboard-time-info">Time</h5>
        <h5 className="ladderboard-averageWpm-info">Average</h5>
        <h5 className="ladderboard-last10races-info">10 Races Avg</h5>
        <h5 className="ladderboard-info-higest">Highest</h5>
      </div>
      <div className="ladderboard-table">
        {data.map((user, index) => {
          return (
            <div className="ladderboard-row">
              <h4 className="ladderboard-number-item">{index + 1}</h4>
              <h4 className="ladderboard-name-item">{user.name}</h4>
              <h4 className="ladderboard-races-item">{user.races}</h4>
              <h4 className="ladderboard-time-item">{user.time}</h4>
              <h4 className="ladderboard-averageWpm-item">{user.averageWpm}</h4>
              <h4 className="ladderboard-last10races-item">
                {user.last10racesWpm}
              </h4>
              <h4 className="ladderboard-item-higest">{user.highestWpm}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ladderboard;
