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
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(true);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);

  const [fastestRace, setFastestRace] = useState();
  const [roomToJoin, setRoomToJoin] = useState("default");
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("User");
  const [someoneIsTyping, setSomeoneIsTyping] = useState();
  const [messagesEnd, setMessagesEnd] = useState();

  const replayData = useSelector((state) => state.replayDataReducer);

  useEffect(() => {
    socket.on("messageIncoming", (data) => {
      const dataWithLocalTime = {
        message: data.message,
        name: data.name,
        room: roomToJoin,
        time: getTheCurrentTime(),
      };

      setMessages((messages) => [...messages, dataWithLocalTime]);
    });

    socket.on("typing", (data) => {
      if (data === true) {
        setSomeoneIsTyping(true);
      } else setSomeoneIsTyping(false);
    });
  }, []);

  const scrollToBottom = () => {
    setMessagesEnd((messagesEnd) =>
      messagesEnd.scrollIntoView({ behavior: "smooth" })
    );
  };

  const getTheCurrentTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    let formatedTime = "";

    if (minutes < 10 && hours < 10) {
      formatedTime = "0" + hours + ":0" + minutes;
    } else if (minutes < 10) {
      formatedTime = hours + ":0" + minutes;
    } else if (hours < 10) {
      formatedTime = "0" + hours + ":" + minutes;
    } else {
      formatedTime = hours + ":" + minutes;
    }

    return formatedTime;
  };

  const sendMessage = () => {
    const data = { message: textMessage, name: name, room: roomToJoin };
    socket.emit("sendMessage", data, (callback_data) => {
      console.log(callback_data.data);
    });
  };

  useEffect(() => {
    if (textMessage !== "") {
      socket.emit("typing", true);
    } else socket.emit("typing", false);
  }, [textMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesEnd]);

  const chatRoom = () => {
    return (
      <div
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
        className={isChatRoomOpen ? "chat-room-shown" : "chat-room-hidden"}
      >
        <div></div>
        <div className="messages-div">
          {messages.map((message, index) => {
            return (
              <div key={index}>
                <div>
                  <h5 style={{ marginTop: "5px", marginBottom: "0px" }}>
                    {message.name} - {message.time}
                  </h5>
                  <p style={{ marginTop: "0px", marginBottom: "0px" }}>
                    {message.message}
                  </p>
                </div>
              </div>
            );
          })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => setMessagesEnd((messagesEnd) => (messagesEnd = el))}
          ></div>
        </div>
        <div className="input-form-chat-div">
          <h5 className="someone-is-typing">
            {someoneIsTyping && "Someone is typing..."}
          </h5>
          <form className="input-form-chat">
            <input
              className="input-field-chat"
              type="input"
              onChange={(e) => {
                setTextMessage(e.target.value);
              }}
              value={textMessage}
              placeholder="text"
            ></input>
            <button
              className="input-button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (text !== "") {
                  sendMessage();
                  setTextMessage("");
                }
              }}
            >
              send
            </button>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (replayData) {
      setText(quotes[replayData[0].textTypedId - 1]);
      setTextTypedId(quotes[replayData[0].textTypedId - 1].id);

      setIsLoading(false);
    }
  }, [replayData]);

  const getTheDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formatedTime = `${
      hour === 0 ? "00" : hour < 10 ? "0" + hour : hour
    }:${minute === 0 ? "00" : minute < 10 ? "0" + minute : minute} - ${
      month === 0 ? "00" : month < 10 ? "0" + month : month
    }/${day === 0 ? "00" : day < 10 ? "0" + day : day}/${year}`;

    return formatedTime;
  };

  const postTheDataToTheServer = () => {
    if (isLoggedIn) {
      const data = {
        wpm: calculateWordsPerMinute(),
        time: timeSeconds,
        mistakes: realMistakes,
        textTypedId: textTypedId,
        date: getTheDate(),
        accuracy: calculateAccuracy(),
      };

      const headers = {
        Authorization: jwt,
      };

      axios
        .post("https://protypist.herokuapp.com/users/statistics", data, {
          headers: headers,
        })
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (finished) {
      const DATA = { _id: replayData[0].textTypedId };
      const headers = {
        Authorization: jwt,
      };

      axios
        .post("https://protypist.herokuapp.com/text/findById", DATA, {
          headers: headers,
        })
        .then((response) => {
          dispatch({
            type: "SET_REPLAY_DATA",
            payload: response.data,
          });
        });
    }
  }, [finished, newGame]);

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
      calculateAccuracy();
      dispatch({
        type: "SET_LATEST_WPM",
        payload: calculateWordsPerMinute(),
      });

      dispatch({
        type: "SET_LATEST_ERRORS_TYPING_GAME",
        payload: realMistakes,
      });

      if (isLoggedIn) {
        postTheDataToTheServer();
      }
    } else if (charactersTyped >= 1) {
      setIsRunning(true);
    }

    let inputArray = e.target.value.split(" ");
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].search("//f") !== -1) {
        e.target.value = "";
        setSpanArray(blankSpanArray);
        setInfoAboutCharacter(blankInfoArray);
        setFinished(true);
        setSeconds(0);
        setMinutes(0);
        setTimeSeconds(0);
        setCharactersTyped(0);
        setIsRunning(false);
        setMistakes(0);
        setRealMistakes(0);
        setProgress(1);
        calculateAccuracy();
      }
    }

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

  const calculateWithOfProgressBar = () => {
    if (textArrayCharacters !== undefined) {
      let percent = (charactersTyped / textArrayCharacters.length) * 100;
      return percent;
    }
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
                onClick={() => props.isOpen()}
                className="close-icon-login fas fa-times fa-2x"
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setFinished(false);
  }, [isReplayComponentShown]);

  useEffect(() => {
    if (replayData !== null && replayData !== undefined) {
      let fastestWPM = 0;
      replayData.map((data, index) => {
        if (data.wpm > fastestWPM) {
          fastestWPM = data.wpm;
          setFastestRace(data);
        }
      });
    }
  }, [replayData]);

  const joinRoomComponent = () => {
    return (
      <div
        style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
        className={isJoinRoomOpen ? "join-room-open" : "join-room-closed"}
      >
        <h5>Choose the room to join</h5>
        <hr style={{ backgroundColor: colorFiles.hrColor }}></hr>
        <div>
          <input
            onChange={(e) => {
              setRoomToJoin(e.target.value);
            }}
            placeholder="Type nothing to join the default room"
            className="join-room-input"
          ></input>
          <button
            onClick={() => {
              setIsJoinRoomOpen(false);
            }}
            style={{ position: "absolute", right: "15px", bottom: "10px" }}
            className="btn btn-light"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: colorFiles.secondaryBackgroundColor,
          color: colorFiles.fontColor,
        }}
        className={"multiplayer-text-shown"}
      >
        <div>
          <div
            className={
              isJoinRoomOpen
                ? "darkened-background-on"
                : "darkened-background-off"
            }
          ></div>
          {chatRoom()}
          {joinRoomComponent()}
          {!finished && (
            <hr
              className="hr-progress"
              style={
                finished || !isRunning
                  ? {
                      width: "100%",
                      backgroundColor: colorFiles.primaryColor,
                      margin: 0,
                      marginBottom: "1rem",
                      marginTop: 0,
                    }
                  : {
                      width: calculateWithOfProgressBar() + "%",
                      backgroundColor: colorFiles.primaryColor,
                      margin: 0,
                      marginBottom: "1rem",
                      marginTop: 0,
                    }
              }
            ></hr>
          )}
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
          {!finished && displayTheStatistics()}
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
            onChange={(e) => {
              getAndCheckTheInput(e);
            }}
            placeholder="The test will begin when you start typing!"
            className={finished ? "input-box-hidden" : "input-box-shown"}
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