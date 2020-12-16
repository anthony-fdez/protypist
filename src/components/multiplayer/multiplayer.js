import React, { useState, useEffect } from "react";
import "./multiplayer.css";
import { useSelector, useDispatch } from "react-redux";
import Qwerty from "../inScreenKeyboard/qwerty";
import Dvorak from "../inScreenKeyboard/dvorak";
import Colemak from "../inScreenKeyboard/colemak";
import quotes from "../data/quotes.json";
import displayTheArray from "../functions/displayTheArray";
import axios from "axios";

import socketClient from "socket.io-client";
const server = "http://localhost:5000";
const socket = socketClient(server);

const Multiplayer = (props) => {
  const dispatch = useDispatch();

  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM = useSelector((state) => state.latestWPMReducerTypingGame);
  const latestErrors = useSelector(
    (state) => state.latestErrorsReducerTypingGame
  );
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);
  const instaDeath = useSelector((state) => state.instaDeathReducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const keyboardLayout = useSelector((state) => state.selectKeyboardLayout);
  const userNameRedux = useSelector((state) => state.setUserNameReducer);

  //state
  const [text, setText] = useState();
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();
  const [charactersTyped, setCharactersTyped] = useState(0);
  const [spanArray, setSpanArray] = useState();
  const [blankInfoArray, setBlankInfoArray] = useState([]);
  const [finished, setFinished] = useState(false);

  //-----------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [blankSpanArray] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [isUserTyping, setIsUserTyping] = useState(true);
  const [mistakesAlert, setMistakesAlert] = useState(false);
  const [differenceInWPM, setDifferenceInWPM] = useState(0);
  const [differenceInErrors, setDIfferenceInErrors] = useState(0);
  const [progress, setProgress] = useState(1);
  const [realMistakes, setRealMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [textTypedId, setTextTypedId] = useState();
  const [textTypedHistory, setTextTypedHistory] = useState([]);
  const [highestSpeed, setHighestSpeed] = useState();
  const [highestSpeedDate, setHighestSpeedDate] = useState();

  // const [isSubmitQuoteMenuOpen, setIsSubmitQuoteOpen] = useState(false);
  const [isErrorWarningShown, setIsErrorWarningShown] = useState(false);
  const [isSuccessWarningShown, setIsSuccssWarningShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [instaDeathFail, setInstaDeathFail] = useState(false);
  const [wpmAverageLast10races, setWpmAverage10races] = useState();
  const [wpmAverageAllTime, setWpmAverageAllTime] = useState();
  const [averageMistakes, setAverageMistakes] = useState();
  const isReplayComponentShown = useSelector(
    (state) => state.replayComponentShown
  );
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);

  const [fastestRace, setFastestRace] = useState();
  const [roomToJoin, setRoomToJoin] = useState("default");
  const [peopleInRoom, setPeopleInRoom] = useState();
  const [progressData, setProgressData] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isEveryoneReady, setIsEveryoneReady] = useState(false);
  const [isEveryOneFinished, setIsEveryOneFinished] = useState(false);
  const [countDownTimer, setCountDownTimer] = useState(null);
  const [countDownTimerNewText, setCountDownTimerNewText] = useState(null);
  const [userCanStartTyping, setUserCanStartTyping] = useState(false);

  useEffect(() => {
    socket.on("roomData", (data) => {
      if (data !== undefined) {
        console.log(data);
        setPeopleInRoom(data);
      }
    });
    setIsJoinRoomOpen(true);
  }, []);

  useEffect(() => {
    socket.on("progressData", (data) => {
      setProgressData(data.users);
    });
  }, []);

  useEffect(() => {
    socket.emit("setProgress", { progress: progress, room: roomToJoin });
  }, [progress]);

  useEffect(() => {
    if (peopleInRoom) {
      if (peopleInRoom.users[0]) {
        setText(peopleInRoom.users[0].text);
        setTextTypedId(peopleInRoom.users[0].text.id);
      }
    }
  }, [peopleInRoom]);

  useEffect(() => {
    if (text !== undefined) {
      const splitedText = text.text.split("");
      let infoAboutCharacterObject = [];
      splitedText.map((character, index) => {
        let object = null;
        infoAboutCharacterObject.push(object);
        return null;
      });
      setBlankInfoArray(infoAboutCharacterObject);
      setTextArrayCharacters(splitedText);
      setInfoAboutCharacter(infoAboutCharacterObject);
    }
  }, [text]);

  useEffect(() => {
    if (newGame || instaDeathFail) {
      setSpanArray(blankSpanArray);
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, newGame, instaDeathFail]);

  useEffect(() => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        spanArray.push(
          <div style={{ color: colorFiles.noneColor }} className="none">
            {textArrayCharacters[i]}
          </div>
        );
      }
      setInfoAboutCharacter(spanArray);
    }
  }, [newGame, finished, instaDeathFail]);

  useEffect(() => {
    if (finished === true) {
      setSpanArray(blankSpanArray);
    } else {
      setSpanArray(
        displayTheArray(
          textArrayCharacters,
          charactersTyped,
          colorFiles,
          infoAboutCharacter
        )
      );
    }
  }, [charactersTyped, textArrayCharacters, finished, instaDeathFail]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch({
        type: "SET_PREVIOUS_ERRORS_TYPING_GAME",
        payload: latestErrors,
      });
    }

    const last10races = parseInt(wpmAverageLast10races);

    const valueToCompare =
      wpmAverageLast10races === 0 ? wpmAverageAllTime : last10races;

    const differenceWPM = Math.round((latestWPM - valueToCompare) * 100) / 100;
    const differenceErrors =
      Math.round((latestErrors - averageMistakes) * 100) / 100;

    setDIfferenceInErrors(differenceErrors);
    setDifferenceInWPM(differenceWPM);
  }, [isRunning, wpmAverageAllTime, averageMistakes]);

  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      let errors = 0;
      for (let i = 0; i < infoAboutCharacter.length; i++) {
        if (infoAboutCharacter[i] === false) {
          errors++;
        }
      }
      setMistakes(errors);
    }
  }, [charactersTyped]);

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    wordsPerMinute = Math.round(wordsPerMinute * 100) / 100;
    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };

  useEffect(() => {
    setNewGame(false);
    setInstaDeathFail(false);
  }, [newGame, instaDeathFail]);

  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      let errors = 0;
      for (let i = 0; i < infoAboutCharacter.length; i++) {
        if (infoAboutCharacter[i] === false) {
          errors++;
        }
      }
      setMistakes(errors);
    }
  }, [charactersTyped]);

  useEffect(() => {
    if (infoAboutCharacter !== undefined) {
      if (progress <= charactersTyped) {
        setProgress((progress) => progress + 1);
      }

      for (let i = 0; i < progress; i++) {
        if (charactersTyped === progress) {
          if (infoAboutCharacter[i] === false) {
            setRealMistakes((mistake) => (mistake = realMistakes + 1));
          }
        }
      }
    }
  }, [charactersTyped]);

  const getAndCheckTheInput = (e) => {
    if (realTimeWPM) {
      calculateWordsPerMinute();
    }
    if (finished) {
      e.target.value = "";
    }
    if (mistakes > 10) {
      setMistakesAlert(true);
    } else if (mistakes < 10) {
      setMistakesAlert(false);
    }

    if (realMistakes === 1 && instaDeath) {
      setSpanArray(blankSpanArray);
      setInfoAboutCharacter(blankInfoArray);
      setSeconds(0);
      setMinutes(0);
      setTimeSeconds(0);
      setCharactersTyped(0);
      setMistakes(0);
      setRealMistakes(0);
      setProgress(1);
      calculateAccuracy();
      setInstaDeathFail(true);
      e.target.value = "";

      dispatch({
        type: "SET_LATEST_WPM",
        payload: calculateWordsPerMinute(),
      });
      dispatch({
        type: "SET_LATEST_ERRORS_TYPING_GAME",
        payload: realMistakes,
      });
    } else if (
      e.target.value.length === textArrayCharacters.length &&
      mistakes < 10
    ) {
      calculateWordsPerMinute();
      setTimeSeconds(0);
      e.target.value = "";
      setIsRunning(false);
      setFinished(true);
      socket.emit("finished", { room: roomToJoin, isFinished: true });
      calculateAccuracy();
      dispatch({
        type: "SET_LATEST_WPM",
        payload: calculateWordsPerMinute(),
      });

      dispatch({
        type: "SET_LATEST_ERRORS_TYPING_GAME",
        payload: realMistakes,
      });

      // if (isLoggedIn) {
      //   postTheDataToTheServer();
      // }
    } else if (charactersTyped >= 1) {
      setIsRunning(true);
    }

    let inputArray = e.target.value.split(" ");

    setCharactersTyped(e.target.value.length);

    if (textArrayCharacters !== undefined) {
      if (
        infoAboutCharacter[e.target.value.length] === false ||
        infoAboutCharacter[e.target.value.length] === true
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = null;
        array[e.target.value.length] = arrayItem;
        setInfoAboutCharacter(array);
      } else if (
        e.target.value[e.target.value.length - 1] ===
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = true;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
      } else if (
        e.target.value[e.target.value.length - 1] !==
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = false;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setTimeSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (isRunning === false) {
      let time = timeSeconds;
      setTimeSeconds(time);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes((minutes) => minutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  const displayWPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return wpm;
      } else return latestWPM;
    } else return latestWPM;
  };

  const calculateAccuracy = () => {
    if (textArrayCharacters !== undefined) {
      const caractersRight = textArrayCharacters.length - realMistakes;
      const accuracy = Math.floor(
        (caractersRight / textArrayCharacters.length) * 100
      );

      setAccuracy(accuracy);
      return accuracy;
    }
  };

  const keyboardLayoutSelector = () => {
    if (keyboardLayout === "QWERTY") {
      return <Qwerty />;
    } else if (keyboardLayout === "DVORAK") {
      return <Dvorak />;
    } else if (keyboardLayout === "COLEMAK") {
      return <Colemak />;
    } else return <Qwerty />;
  };

  const displayTheStatistics = () => {
    return (
      <div className="statistics">
        <div className="d-flex">
          <h5 className="mr-1">WPM: {displayWPM()}</h5>
        </div>
        <div className="d-flex">
          <div className="d-flex mr-5">
            <h5 className="mr-1">Errors: {latestErrors}</h5>
          </div>
          <div style={{ marginRight: "4rem" }} className="d-flex">
            <h5 className="mr-2">Acuracy: </h5>
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            >
              <i
                onClick={() => {
                  socket.emit("leaveRoom", {
                    userName: userNameRedux,
                    room: roomToJoin,
                  });
                  props.isOpen();
                }}
                className="close-icon-login fas fa-times fa-2x"
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (peopleInRoom) {
      const allReady = peopleInRoom.users.every((user) => user.ready === true);

      if (allReady) {
        setCountDownTimer(5);
      }

      setIsEveryoneReady(allReady);
    }
  }, [peopleInRoom, isEveryoneReady]);

  useEffect(() => {
    if (peopleInRoom) {
      const allFinished = peopleInRoom.users.every(
        (user) => user.finished === true
      );

      if (allFinished) {
        setCountDownTimerNewText(5);
      }

      setIsEveryOneFinished(allFinished);
    }
  }, [peopleInRoom]);

  useEffect(() => {
    if (isEveryoneReady) {
      if (countDownTimer === 0) {
        setUserCanStartTyping(true);
        return;
      }

      const interval = setInterval(() => {
        setCountDownTimer(
          (countDownTimer) => (countDownTimer = countDownTimer - 1)
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDownTimer, isEveryoneReady]);

  useEffect(() => {
    if (isEveryOneFinished) {
      socket.emit("setProgress", { progress: 0, room: roomToJoin });
      socket.emit("finished", { room: roomToJoin, isFinished: false });
      setIsReady((isReady) => !isReady);
      socket.emit("setReady", { room: roomToJoin });
      socket.emit("selectNewText", { room: roomToJoin });

      setIsEveryoneReady(false);
      setCountDownTimer(null);
      setCountDownTimerNewText(null);
      setIsEveryOneFinished(false);
      setFinished(false);
      setProgress(0);

      // if (countDownTimerNewText === 0) {
      //   return;
      // }

      // const interval = setInterval(() => {
      //   setCountDownTimerNewText(
      //     (countDownTimerNewText) =>
      //       (countDownTimerNewText = countDownTimerNewText - 1)
      //   );
      // }, 1000);

      // return () => clearInterval(interval);
    }
  }, [countDownTimerNewText, isEveryOneFinished, peopleInRoom]);

  const joinRoomComponent = () => {
    return (
      <div
        style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
        className={isJoinRoomOpen ? "join-room-open" : "join-room-closed"}
      >
        <h4>Choose the room to join</h4>
        <p>Share the room name to your friend to type together</p>
        <hr
          style={{
            backgroundColor: colorFiles.hrColor,
            margin: "0",
            marginBottom: "1rem",
            marginTop: "0.5rem",
          }}
        ></hr>
        <div>
          <input
            onChange={(e) => {
              setRoomToJoin(e.target.value);
            }}
            value="default"
            placeholder="Type nothing to join the default room"
            className="join-room-input"
            style={{
              color: colorFiles.fontColor,
              border: `1px solid ${colorFiles.hrColor}`,
            }}
          ></input>
          <button
            onClick={() => {
              setIsJoinRoomOpen(false);
              socket.emit(
                "join",
                {
                  userName: userNameRedux,
                  room: roomToJoin,
                },
                (error) => {}
              );
            }}
            style={{
              position: "absolute",
              right: "15px",
              bottom: "10px",
              backgroundColor: colorFiles.primaryColor,
              color: colorFiles.fontColor,
            }}
            className="btn btn-light"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  };

  const calculateWithOfProgressBarMultiplayer = (p) => {
    if (textArrayCharacters !== undefined) {
      let percent = (p / textArrayCharacters.length) * 100;
      return percent;
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
        className="multiplayer-text"
      >
        <div>
          <div
            onClick={() => {
              socket.emit(
                "join",
                {
                  userName: userNameRedux,
                  room: roomToJoin,
                },
                (error) => {}
              );
              setIsJoinRoomOpen(false);
            }}
            className={
              isJoinRoomOpen
                ? "darkened-background-on"
                : "darkened-background-off"
            }
          ></div>
          {joinRoomComponent()}

          <p
            className={
              mistakesAlert
                ? "alert-danger alert-warning-shown-replay"
                : "alert-danger alert-warning-hidden-replay"
            }
          >
            <strong>Slow Down...</strong>
            the test won't stop unless you have less than 10 mistakes
          </p>
          {displayTheStatistics()}
        </div>
        <div
          className={
            isUserTyping
              ? "text-to-type-multiplayer"
              : "text-to-type-dark-multiplayer"
          }
        >
          {spanArray}
        </div>
        <div className="players-progress">
          <div style={{ display: "flex" }}>
            <h4 style={{ marginRight: "2rem" }} className="room-to-join-text">
              Room: {roomToJoin}
            </h4>
            <button
              onClick={() => {
                setIsJoinRoomOpen(true);
              }}
              style={{
                backgroundColor: colorFiles.primaryColor,
                color: colorFiles.fontColor,
                marginRight: "1rem",
                width: "150px",
              }}
              className="btn btn-light"
            >
              Change Room
            </button>
            <button
              onClick={() => {
                setIsReady((isReady) => !isReady);
                socket.emit("setReady", { room: roomToJoin });
              }}
              className="btn btn-light"
              style={
                isReady
                  ? {
                      backgroundColor: "rgb(106,220,153)",
                      color: colorFiles.fontColor,
                      marginRight: "1rem",
                      width: "100px",
                    }
                  : {
                      backgroundColor: "rgb(223, 71, 89)",
                      color: colorFiles.fontColor,
                      marginRight: "1rem",
                      width: "100px",
                    }
              }
            >
              {isReady ? "Ready" : "Not Ready"}
            </button>
            {isEveryOneFinished && <h4>New text in {countDownTimerNewText}</h4>}
          </div>
          <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
          {peopleInRoom !== undefined &&
            peopleInRoom.users.map((user, index) => {
              return (
                <div className="players-info">
                  <div className="players-info">
                    {user.ready && (
                      <i
                        style={{ zIndex: 5 }}
                        className="fas fa-check-circle ready-icon"
                      ></i>
                    )}
                    <h4
                      style={{
                        position: "relative",
                        marginLeft: "25px",
                        width: "100%",
                        zIndex: 5,
                      }}
                    >
                      {user.userName}
                      <hr
                        style={{
                          backgroundColor: colorFiles.primaryColor,
                          width: `${calculateWithOfProgressBarMultiplayer(
                            progressData
                              ? progressData[index]
                                ? progressData[index].progress
                                : 0
                              : 0
                          )}%`,
                        }}
                        className="multiplayer-progress-hr"
                      ></hr>
                    </h4>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={"keyboard-div-shown-multiplayer"}>
          {keyboardOnScreen && keyboardLayoutSelector()}
        </div>

        <div className="input-zone-multiplayer">
          <input
            maxLength={textArrayCharacters && textArrayCharacters.length}
            autoFocus
            onFocus={(e) => {
              setIsUserTyping(true);
            }}
            onBlur={(e) => {
              setIsUserTyping(false);
            }}
            disabled={userCanStartTyping ? "" : "true"}
            onChange={(e) => {
              getAndCheckTheInput(e);
            }}
            placeholder={
              isEveryoneReady
                ? userCanStartTyping
                  ? "Start typing!"
                  : `The test will start in ${countDownTimer}s`
                : "The test will start when everyone is ready!"
            }
            className={"input-box-shown"}
            style={{
              color: colorFiles.fontColor,
              borderBottom: `2px solid ${colorFiles.primaryColor}`,
            }}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Multiplayer;
