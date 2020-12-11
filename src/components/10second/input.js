import React, { useState, useEffect } from "react";
import Typical from "react-typical";
import { useSelector } from "react-redux";
import TenSecondsLeaderboard from "./10secondsLeaderboard";
import "./input.css";
import Axios from "axios";

//Add more words and work on making the words not reapeat!

function Input(props) {
  const [lost, setLost] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [seconds, setSeconds] = useState(9);
  const [miliseconds, setMiliseconds] = useState(0);
  const [score, setScore] = useState(0);
  const [addSecond, setAddSecond] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const [countingUpSeconds, setCountingUpSeconds] = useState(0); //the counting up seconds are to calculate the words per minut
  const [wpm, setWPM] = useState(0);
  const [keyPressed, setKeyPressed] = useState(0);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  const [words] = useState(() => {
    let randomNewWords = require("random-words");
    return randomNewWords(2000); //2000 words is probably too much but this almost makes the words not repeat
  });

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

  /*================== Select the random words ==================*/

  useEffect(() => {
    setIsRunning(false);
    setSeconds(9);
    setMiliseconds(0);
    setScore(0);
  }, [props.dificulty]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = {
        Authorization: jwt,
      };

      Axios.get("https://protypist.herokuapp.com/10seconds", {
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
    }
  }, [props.dificulty]);

  useEffect(() => {
    if (props.language === false) {
      const seletRandomWord = () => {
        let json = require("./palabras.json");
        let random = Math.floor(
          Math.random() * Math.floor(json.palabras.length)
        );
        let randomWord = json.palabras[random];
        return randomWord;
      };
      setRandomWord(seletRandomWord());
    } else {
      const seletRandomWord = () => {
        let random = Math.floor(Math.random() * Math.floor(words.length));

        let randomWord = words[random];
        return randomWord;
      };
      setRandomWord(seletRandomWord());
    }
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
      if (isRunning) {
        let wordsPerMinute = (score / countingUpSeconds) * 60;
        setWPM(wordsPerMinute);
      }
      if (score > highestScore) {
        setHighestScore(score);
        if (isLoggedIn) {
          const headers = {
            Authorization: jwt,
          };

          const data = {
            score: score,
          };

          if (props.dificulty === "EASY") {
            Axios.post("https://protypist.herokuapp.com/10seconds/easy", data, {
              headers: headers,
            })
              .then((response) => {
                console.log(response);
              })
              .catch((e) => {
                console.log(e);
              });
          } else if (props.dificulty === "NORMAL") {
            Axios.post(
              "https://protypist.herokuapp.com/10seconds/normal",
              data,
              {
                headers: headers,
              }
            )
              .then((response) => {
                console.log(response);
              })
              .catch((e) => {
                console.log(e);
              });
          } else if (props.dificulty === "HARD") {
            Axios.post("https://protypist.herokuapp.com/10seconds/hard", data, {
              headers: headers,
            })
              .then((response) => {
                console.log(response);
              })
              .catch((e) => {
                console.log(e);
              });
          } else if (props.dificulty === "EPIC") {
            Axios.post("https://protypist.herokuapp.com/10seconds/epic", data, {
              headers: headers,
            })
              .then((response) => {
                console.log(response);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      }
      if (isRunning === false && lost === true) {
        setCountingUpSeconds(0);
      }
    };
    calculateWordPerMinute();
  }, [score, isRunning, keyPressed]);

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
    setKeyPressed((keyPressed) => {
      return keyPressed + 1;
    });
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
        setWPM(0);
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

  return (
    <div className="input">
      <TenSecondsLeaderboard isOpen={isLeaderboardOpen} />
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
      <div className="mt-3 ml-2 d-flex justify-content-between">
        <h4 style={{ color: colorFiles.fontColor }} className="score-big-text">
          Score: {score}
        </h4>
      </div>
      <div>
        <h5 style={{ color: colorFiles.fontColor }} className={"highest-score"}>
          Highest Score: {highestScore}
        </h5>
      </div>
    </div>
  );
}

export default Input;
