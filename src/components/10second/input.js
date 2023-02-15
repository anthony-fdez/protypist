import React, { useState, useEffect } from "react";
import Typical from "react-typical";
import { useSelector, useDispatch } from "react-redux";
import TenSecondsLeaderboard from "./10secondsLeaderboard";
import "./input.css";
import Axios from "axios";

//Add more words and work on making the words not reapeat!

function Input(props) {
  const dispatch = useDispatch();

  const [lost, setLost] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [seconds, setSeconds] = useState(9);
  const [miliseconds, setMiliseconds] = useState(0);
  const [score, setScore] = useState(0);
  const [addSecond, setAddSecond] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const [countingUpSeconds, setCountingUpSeconds] = useState(0); //the counting up seconds are to calculate the words per minut
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [timePlaying, setTimePlaying] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const myUserId = useSelector((state) => state.userIdReducer);

  const [words] = useState(() => {
    let randomNewWords = require("random-words");
    return randomNewWords(2000); //2000 words is probably too much but this almost makes the words not repeat
  });

  const [myRank, setMyRank] = useState(0);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  /*================== Select the random words ==================*/

  useEffect(() => {
    setIsRunning(false);
    setSeconds(9);
    setMiliseconds(0);
    setScore(0);
    setTimePlaying(0);
  }, [props.dificulty]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = {
        Authorization: jwt,
      };

      Axios.get("https://protypist.onrender.com/10seconds", {
        headers: headers,
      })
        .then((response) => {
          if (props.dificulty === "EASY") {
            setHighestScore(response.data.data.easy.highestScore);
          } else if (props.dificulty === "NORMAL") {
            setHighestScore(response.data.data.normal.highestScore);
          } else if (props.dificulty === "HARD") {
            setHighestScore(response.data.data.hard.highestScore);
          } else if (props.dificulty === "EPIC") {
            setHighestScore(response.data.data.epic.highestScore);
          }
        })
        .catch((e) => {
          console.log(e.response);
        });

      if (props.dificulty === "EASY") {
        Axios.get("https://protypist.onrender.com/10seconds/leaderboard/easy", {
          headers: headers,
        })
          .then((response) => {
            findRanking(response.data.leaderboard_easy);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (props.dificulty === "NORMAL") {
        Axios.get(
          "https://protypist.onrender.com/10seconds/leaderboard/normal",
          {
            headers: headers,
          }
        )
          .then((response) => {
            findRanking(response.data.leaderboard_normal);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (props.dificulty === "HARD") {
        Axios.get("https://protypist.onrender.com/10seconds/leaderboard/hard", {
          headers: headers,
        })
          .then((response) => {
            findRanking(response.data.leaderboard_hard);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (props.dificulty === "EPIC") {
        Axios.get("https://protypist.onrender.com/10seconds/leaderboard/epic", {
          headers: headers,
        })
          .then((response) => {
            findRanking(response.data.leaderboard_epic);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [props.dificulty, jwt, isLoggedIn, isLeaderboardOpen]);

  const findRanking = (DATA) => {
    DATA.map((data, index) => {
      if (data.id === myUserId) {
        setMyRank(index + 1);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setTimePlaying((timePlaying) => timePlaying + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timePlaying]);

  useEffect(() => {
    const seletRandomWord = () => {
      let json = require("../data/words.json");
      let random = Math.floor(
        Math.random() * Math.floor(json.english_expanded.length)
      );
      let randomWord = json.english_expanded[random];
      return randomWord;
    };
    setRandomWord(seletRandomWord());
  }, [score, lost, words]);

  /*================== Clock countdown ==================*/

  useEffect(() => {
    let intervalSeconds = null;
    let intervalMiliseconds = null;

    if (isRunning) {
      intervalMiliseconds = setInterval(() => {
        setMiliseconds((miliseconds) => miliseconds - 1);
      }, 100);
    } else if (seconds === 0) {
      setIsRunning(false);
      setLost(true);
    }
    if (miliseconds > 10) {
      setMiliseconds((miliseconds) => miliseconds - 10);
      setSeconds((seconds) => seconds + 1);
    }
    if (miliseconds <= 0) {
      setMiliseconds(9);
      setSeconds((seconds) => seconds - 1);
    }

    if (seconds < 0) {
      setLost(true);
      setIsRunning(false);
    }
    return () => {
      clearInterval(intervalSeconds);
      clearInterval(intervalMiliseconds);
    };
  }, [seconds, isRunning, miliseconds]);

  /*================== Clock counting up ==================*/

  useEffect(() => {
    let intervalSeconds = null;

    if (isRunning) {
      intervalSeconds = setInterval(() => {
        setCountingUpSeconds((countingUpSeconds) => countingUpSeconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalSeconds);
    };
  }, [countingUpSeconds, isRunning]);

  /*================== Calculate words per minute ==================*/

  useEffect(() => {
    const calculateWordPerMinute = () => {
      if (isLoggedIn && isRunning) {
        const headers = {
          Authorization: jwt,
        };

        const data = {
          score: score,
          time: timePlaying,
        };

        if (props.dificulty === "EASY") {
          Axios.post("https://protypist.onrender.com/10seconds/easy", data, {
            headers: headers,
          })
            .then((response) => {})
            .catch((e) => {
              console.log(e);
            });
        } else if (props.dificulty === "NORMAL") {
          Axios.post("https://protypist.onrender.com/10seconds/normal", data, {
            headers: headers,
          })
            .then((response) => {})
            .catch((e) => {
              console.log(e);
            });
        } else if (props.dificulty === "HARD") {
          Axios.post("https://protypist.onrender.com/10seconds/hard", data, {
            headers: headers,
          })
            .then((response) => {})
            .catch((e) => {
              console.log(e);
            });
        } else if (props.dificulty === "EPIC") {
          Axios.post("https://protypist.onrender.com/10seconds/epic", data, {
            headers: headers,
          })
            .then((response) => {})
            .catch((e) => {
              console.log(e);
            });
        }
      }
      if (isRunning === false && lost === true) {
        setCountingUpSeconds(0);
      }
    };
    calculateWordPerMinute();
  }, [isRunning, timePlaying]);

  /*================== Select the text to display at the befining of the game ==================*/

  const startOfTheGame = () => {
    if (isRunning) {
      return (
        <div className="time-and-word-to-type container d-flex justify-content-between">
          <h3 className="word-to-type">{randomWord.split("").join(" ")}</h3>

          <div className="">
            <h5
              style={{ color: colorFiles.primaryColor }}
              className={"time-left"}
            >
              {seconds}:{miliseconds < 10 ? `${miliseconds}0` : miliseconds}
            </h5>
          </div>
        </div>
      );
    } else if (isRunning === false && lost === true) {
      return (
        <div>
          <h1 className="start-message">
            <Typical
              className="word-to-type"
              wraper="b"
              steps={["Game over."]}
            />
          </h1>
        </div>
      );
    } else if (isRunning === false) {
      return (
        <div className="game-over-message">
          <Typical
            className="word-to-type"
            wraper="b"
            steps={['Type "start" to begin!']}
          />
        </div>
      );
    }
  };

  /*================== Show the +1 second  ==================*/

  const selectTheAmountOfSecconds = () => {
    if (props.dificulty === "EASY") {
      return 2;
    } else if (props.dificulty === "NORMAL") {
      return 1;
    } else if (props.dificulty === "HARD") {
      return 0.5;
    } else if (props.dificulty === "EPIC") {
      return 0.2;
    }
  };

  const displayAddingSeconds = () => {
    if (addSecond) {
      return (
        <h5 className="add-second text-success">
          {`+${selectTheAmountOfSecconds()}`} second
        </h5>
      );
    }
  };

  /*================== Change the place holder of the input box ==================*/

  const placeholderChange = () => {
    let placeholder = "";
    if (isRunning) {
      placeholder = `Type: "${randomWord}"`;
    } else if (!isRunning) {
      placeholder = 'Type "start"';
    }
    return placeholder;
  };

  /*================== Check for equal word ==================*/

  const checkForEqualWord = (e) => {
    if (isRunning) {
      if (e.target.value === randomWord) {
        e.target.value = "";
        setScore((score) => score + 1);
        if (props.dificulty === "EASY") {
          setSeconds((seconds) => seconds + 2);
        } else if (props.dificulty === "NORMAL") {
          setSeconds((seconds) => seconds + 1);
        } else if (props.dificulty === "HARD") {
          setMiliseconds((miliseconds) => miliseconds + 5);
        } else if (props.dificulty === "EPIC") {
          setMiliseconds((miliseconds) => miliseconds + 2);
        }
      }
    } else if (isRunning === false) {
      if (e.target.value === "start" || e.target.value === "let's go") {
        setSeconds(9);
        setMiliseconds(9);
        setLost(false);
        setIsRunning(true);
        setScore(0);
        setTimePlaying(0);
        e.target.value = "";
      }
    }
  };

  /*================== This is what makes the "1+ second" text only show up for half a second ==================*/

  useEffect(() => {
    const resolveAfter500ms = () => {
      return new Promise((resolve) => {
        setAddSecond(true);
        setTimeout(() => {
          resolve(setAddSecond(false));
        }, 500);
      });
    };
    const asyncCall = async () => {
      await resolveAfter500ms();
    };
    asyncCall();
  }, [score]);

  /*================== Render section ==================*/

  const onLeaderboardChange = () => {
    setIsLeaderboardOpen(false);
  };

  return (
    <div className="input">
      <TenSecondsLeaderboard
        isOpen={isLeaderboardOpen}
        onChange={onLeaderboardChange}
      />
      <div
        onClick={() => setIsLeaderboardOpen(false)}
        className={
          isLeaderboardOpen
            ? "darkened-background-10seconds-on"
            : "darkened-background-10seconds-off"
        }
      ></div>
      <div
        className="start-of-game-10seconds"
        style={{ color: colorFiles.fontColor }}
      >
        {startOfTheGame()}
        <div>{displayAddingSeconds()}</div>
      </div>
      <div className="input">
        <input
          autoFocus
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={checkForEqualWord}
          placeholder={placeholderChange()}
          type="text"
          className="input-box-10seconds"
          style={
            seconds < 3 && lost === false
              ? { color: colorFiles.fontColor, borderBottom: `2px solid red` }
              : {
                  color: colorFiles.fontColor,
                  borderBottom: `2px solid ${colorFiles.primaryColor}`,
                }
          }
        />
      </div>
      <div className="mt ml-1 d-flex justify-content-between">
        <h4 style={{ color: colorFiles.fontColor }} className="score-big-text">
          Score: {score}
        </h4>
      </div>
      <div>
        <h5 style={{ color: colorFiles.fontColor }} className={"highest-score"}>
          Highest Score: {highestScore}
        </h5>
        <h5
          style={{ color: colorFiles.fontColor, display: "flex" }}
          className={"highest-score"}
        >
          {isLoggedIn && `Rank: #${myRank}`}
          <h5
            onClick={() => {
              isLoggedIn
                ? setIsLeaderboardOpen(true)
                : dispatch({
                    type: "SET_OPEN_LOGIN_MENU",
                    payload: true,
                  });
            }}
            style={{ color: colorFiles.primaryColor }}
            className="leaderboard-link"
          >
            {isLoggedIn
              ? "Open Leaderboard"
              : "Log In to see your rank and the leaderboard"}
          </h5>
        </h5>
      </div>
    </div>
  );
}

export default Input;
