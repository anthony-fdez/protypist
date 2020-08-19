import React, { useState, useEffect, useDebugValue } from "react";
import "./TypingTest.css";

//components
import Header from "../header/header";
import Keyboard from "../inScreenKeyboard/keyboard";

import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import axios from "axios";

function TypingTest() {
  const dispatch = useDispatch();

  //redux reducers
  const theme = useSelector((state) => state.darkModeReducer);
  const keyboardOnScreen = useSelector(
    (state) => state.keyboardOnScreenReducer
  );
  const previousWPM = useSelector(
    (state) => state.previousWPMReducerTypingGame
  );

  const realTimeWPM = useSelector((state) => state.realTimeWPMReducer);
  const latestWPM = useSelector((state) => state.latestWPMReducerTypingGame);
  const latestErrors = useSelector(
    (state) => state.latestErrorsReducerTypingGame
  );
  const previousErrors = useSelector(
    (state) => state.previousErrorsReducerTypingGame
  );
  const isSideMenuOpen = useSelector((state) => state.openSideMenuReducer);
  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);

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

  const [isSubmitQuoteMenuOpen, setIsSubmitQuoteOpen] = useState(false);
  const [isErrorWarningShown, setIsErrorWarningShown] = useState(false);
  const [isSuccessWarningShown, setIsSuccssWarningShown] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blinking, setIsBlinking] = useState(true);

  //submit a quote info

  // const [quoteTitle, setQuoteTitle] = useState();
  // const [quoteText, setQuoteText] = useState();
  // const [quoteFrom, setQuoteFrom] = useState();
  // const [quoteBy, setQuoteBy] = useState();
  // const [quoteImageUrl, setQuoteImageUrl] = useState();
  // const [quoteLinkUrl, setQuoteLinkUrl] = useState();
  // const [quoteType, setQuoteType] = useState("Song");

  useEffect(() => {
    let myTimeout;
    if (isErrorWarningShown || isSuccessWarningShown) {
      myTimeout = setTimeout(() => {
        setIsErrorWarningShown(false);
        setIsSuccssWarningShown(false);
      }, 3000);
    }
    return () => clearTimeout(myTimeout);
  }, [isErrorWarningShown, isSuccessWarningShown]);

  //========================================================

  const postTheDataToTheServer = () => {
    if (isLoggedIn) {
      const data = {
        wpm: calculateWordsPerMinute(),
        time: seconds,
        mistakes: realMistakes,
        textTypedId: textTypedId,
        date: getTheDate(),
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
    axios
      .get("https://protypist.herokuapp.com/texts/getRandom")
      .then((res) => {
        setText(res.data[0]);
        if (isLoggedIn) {
          setTextTypedId(res.data[0]._id);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(true);
        console.log(e.response);
      });
  }, [newGame, jwt]);

  // const submitNewQuote = () => {
  //   const data = {
  //     title: quoteTitle,
  //     text: quoteText,
  //     from: quoteFrom,
  //     by: quoteBy,
  //     image: quoteImageUrl,
  //     linkURL: quoteLinkUrl,
  //     type: quoteType,
  //   };
  //   const headers = {
  //     Authorization: jwt,
  //   };

  //   axios
  //     .post("https://protypist.herokuapp.com/texts", data, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((e) => {
  //       console.log(e.response);
  //     });
  // };

  useEffect(() => {
    if (isLoggedIn) {
      const headers = {
        Authorization: jwt,
      };
      const data = {
        textTypedId: textTypedId,
      };

      axios
        .post("https://protypist.herokuapp.com/users/getRaceScores", data, {
          headers: headers,
        })
        .then((res) => {
          setTextTypedHistory(res.data);
          getTheHighestSpeedForARace(res.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
  }, [isSideMenuOpen, textTypedId]);

  const getTheDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const formatedTime = `${
      hour === 0 ? "00" : hour < 10 ? "0" + hour : hour
    }:${minute === 0 ? "00" : minute < 10 ? "0" + minute : minute} - ${
      month === 0 ? "00" : month < 10 ? "0" + month : month
    }/${day === 0 ? "00" : day < 10 ? "0" + day : day}/${year}`;

    return formatedTime;
  };

  //========================================================

  //========= Create a blank array of spans that has all its classes set to none //

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
    if (newGame === true) {
      setSpanArray(blankSpanArray);
    } else setSpanArray(displayTheArray());
  }, [charactersTyped, textArrayCharacters, newGame]);

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
  }, [newGame, finished]);

  useEffect(() => {
    if (finished === true) {
      setSpanArray(blankSpanArray);
    } else {
      setSpanArray(displayTheArray());
    }
  }, [charactersTyped, textArrayCharacters, finished, blinking]);

  useEffect(() => {
    if (isRunning === true) {
      dispatch({
        type: "SET_PREVIOUS_WPM",
        payload: latestWPM,
      });

      dispatch({
        type: "SET_PREVIOUS_ERRORS_TYPING_GAME",
        payload: latestErrors,
      });
    }

    const differenceWPM = latestWPM - previousWPM;
    const differenceErrors = latestErrors - previousErrors;

    setDIfferenceInErrors(differenceErrors);
    setDifferenceInWPM(differenceWPM);
  }, [isRunning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(!blinking);
    }, 500);
    return () => clearInterval(interval);
  }, [blinking, charactersTyped]);

  useEffect(() => {
    setIsBlinking(true);
  }, [charactersTyped]);

  const displayTheArray = () => {
    if (textArrayCharacters !== undefined) {
      let spanArray = [];
      for (let i = 0; i < textArrayCharacters.length; i++) {
        if (i === charactersTyped) {
          spanArray.push(
            <div
              key={"key" + i}
              className={"blinking"}
              style={
                blinking
                  ? {
                      color: colorFiles.noneColor,
                      borderLeft: `2px solid ${colorFiles.fontColor}`,
                    }
                  : {
                      color: colorFiles.noneColor,
                      borderLeft: `2px solid ${colorFiles.backgroundColor}`,
                    }
              }
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === true) {
          spanArray.push(
            <div
              key={"key" + i}
              className="green"
              style={{ color: colorFiles.correctColor }}
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else if (infoAboutCharacter[i] === false) {
          spanArray.push(
            <div
              key={"key" + i}
              className="red"
              style={{
                backgroundColor: colorFiles.wrongColor,
                color: colorFiles.fontColor,
              }}
            >
              {textArrayCharacters[i]}
            </div>
          );
        } else {
          spanArray.push(
            <div
              key={"key" + i}
              className="none"
              style={{ color: colorFiles.noneColor }}
            >
              {textArrayCharacters[i]}
            </div>
          );
        }
      }
      return spanArray;
    }
  };

  //========= Display the errors the user makes //

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
    setNewGame(false);
  }, [newGame]);

  //real errors
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

  //========= Calculate words per minute //

  const calculateWordsPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let wordsPerMinute = (charactersPerSecond * 60) / 5;
    let charactersPerMinute = charactersPerSecond * 60;
    wordsPerMinute = Math.round(wordsPerMinute);
    charactersPerMinute = Math.round(charactersPerMinute);
    setWPM(wordsPerMinute);

    return wordsPerMinute;
  };

  const calculateCharactersPerMinute = () => {
    let charactersPerSecond = charactersTyped / timeSeconds;
    let charactersPerMinute = charactersPerSecond * 60;
    charactersPerMinute = Math.round(charactersPerMinute);

    return charactersPerMinute;
  };

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
    if (e.target.value.length === textArrayCharacters.length && mistakes < 5) {
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

  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 200 },
  });

  const displayWPM = () => {
    if (realTimeWPM) {
      if (isRunning) {
        return wpm;
      } else return latestWPM;
    } else return latestWPM;
  };

  const changeTextToTypeClassname = () => {
    if (isUserTyping) {
      return "text-to-type";
    } else return "text-to-type-dark";
  };

  const handleThemInTheFinishedPage = () => {
    if (finished) {
      return "about-the-text-shown";
    } else return "about-the-text-hidden";
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
    }
  };

  const getTheHighestSpeedForARace = (data) => {
    if (data.length === 0) {
      setHighestSpeed("No Data");
      setHighestSpeedDate("No Data");
      return 0;
    }

    let speed = 0;
    let date = "";

    for (let i = 0; i < data.length; i++) {
      if (data[i].wpm > speed) {
        speed = data[i].wpm;
        date = data[i].date;
      }
      setHighestSpeed(speed);
      setHighestSpeedDate(date);
    }
  };

  // const checkTheSubmitQuoteInput = () => {
  //   if (quoteTitle === undefined) {
  //     setMessage("You have to provide a Title for the quote.");
  //     setIsErrorWarningShown(true);
  //     return false;
  //   }

  //   if (quoteText === undefined) {
  //     setMessage("You have to provide a valid Text");
  //     setIsErrorWarningShown(true);
  //     return false;
  //   } else if (quoteText.length > 250) {
  //     setMessage("That quote is too long.");
  //     setIsErrorWarningShown(true);
  //     return false;
  //   }

  //   if (quoteFrom === undefined) {
  //     setMessage(
  //       "You need to provide where is this quote from... ie: Star Wars"
  //     );
  //     setIsErrorWarningShown(true);
  //     return false;
  //   } else if (quoteFrom > 50) {
  //     setMessage("Your 'from' field is too long, max of 40 characthers");
  //     setIsErrorWarningShown(true);
  //     return false;
  //   }

  //   if (quoteBy === undefined) {
  //     setMessage("You need to say who this quote belongs to... It's author.");
  //     setIsErrorWarningShown(true);
  //     return false;
  //   }

  //   if (quoteImageUrl === undefined) {
  //     setMessage(
  //       "You have to provide an URL of a picture that relates with your quote."
  //     );
  //     setIsErrorWarningShown(true);
  //     return false;
  //   }

  //   if (quoteLinkUrl === undefined || validator.isURL(quoteLinkUrl) === false) {
  //     setMessage("The quote Link is not valid, it has to be a URL");
  //     setIsErrorWarningShown(true);
  //     return false;
  //   }

  //   return true;
  // };

  const successWarning = () => {
    return (
      <div
        style={{ left: "200px" }}
        className={
          isSuccessWarningShown
            ? "success-warning-shown bg-primary"
            : "success-warning-hidden bg-primary"
        }
      >
        <h5>{message}</h5>
      </div>
    );
  };

  const errorWarning = () => {
    return (
      <div
        style={{ left: "200px" }}
        className={
          isErrorWarningShown
            ? "error-warning-shown bg-danger"
            : "error-warning-hidden bg-danger"
        }
      >
        <h4 style={{ marginRight: "10px" }}>
          <strong>Error: </strong>
        </h4>
        <h5>{message}</h5>
      </div>
    );
  };

  const displayTheHistory = () => {
    if (textTypedHistory !== undefined) {
      const data = textTypedHistory;
      return (
        <div
          className={"ml-4 mr-4  mt-1 history-div"}
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
        >
          {data
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className={"d-flex justify-content-between mb-1 p-2"}
                >
                  <p>{item.wpm} WPM</p>
                  <p>Date: {item.date}</p>
                </div>
              );
            })}
        </div>
      );
    }
  };

  // const submitQuoteMenu = () => {
  //   return (
  //     <div
  //       className={
  //         isSubmitQuoteMenuOpen
  //           ? "submit-quote-menu-open"
  //           : "submit-quote-menu-closed"
  //       }
  //     >
  //       <div className="side-menu-header">
  //         <h3>Submit Your Quote</h3>
  //         <i
  //           onClick={() => {
  //             setIsSubmitQuoteOpen(false);
  //           }}
  //           className="fas fa-times fa-2x close-icon mt-3"
  //         ></i>
  //       </div>
  //       <hr className={theme ? "white-hr" : "dark-hr"}></hr>
  //       <div className="submit-quote-inner-div">
  //         <h5 className="ml-3 mt-3">Title:</h5>
  //         <input
  //           type="text"
  //           onChange={(e) => {
  //             setQuoteTitle(e.target.value);
  //           }}
  //           className="form-control"
  //           placeholder="Title of your quote"
  //         ></input>
  //         <h5 className="ml-3 mt-3">Text:</h5>
  //         <input
  //           type="text"
  //           onChange={(e) => {
  //             setQuoteText(e.target.value);
  //           }}
  //           className="form-control"
  //           placeholder="The Quote"
  //         ></input>
  //         <h5 className="ml-3 mt-3">From:</h5>
  //         <input
  //           type="text"
  //           onChange={(e) => {
  //             setQuoteFrom(e.target.value);
  //           }}
  //           className="form-control"
  //           placeholder="Where is this quote from?"
  //         ></input>
  //         <h5 className="ml-3 mt-3">By:</h5>
  //         <input
  //           type="text"
  //           onChange={(e) => {
  //             setQuoteBy(e.target.value);
  //           }}
  //           className="form-control"
  //           placeholder="Who is the owner of the quote?"
  //         ></input>
  //         <h5 className="ml-3 mt-3">Image:</h5>
  //         <input
  //           type="text"
  //           onChange={(e) => {
  //             setQuoteImageUrl(e.target.value);
  //           }}
  //           className="form-control"
  //           placeholder="Link of a picture of the quote."
  //         ></input>
  //         <h5 className="ml-3 mt-3">Link:</h5>
  //         <input
  //           type="text"
  //           onChange={(e) => {
  //             setQuoteLinkUrl(e.target.value);
  //           }}
  //           className="form-control"
  //           placeholder="Link to the source of the quote."
  //         ></input>
  //         <h5 className="ml-3 mt-3">Type:</h5>
  //         <hr className={theme ? "white-hr" : "dark-hr"}></hr>
  //         <div className="d-flex justify-content-between mt-3">
  //           <h4>What is this quote from:</h4>
  //           <select id="cars">
  //             <option onClick={() => setQuoteType("Movie")}>Movie</option>
  //             <option onClick={() => setQuoteType("Show")}>Show</option>
  //             <option onClick={() => setQuoteType("Song")}>Song</option>
  //             <option onClick={() => setQuoteType("Book")}>Book</option>
  //             <option onClick={() => setQuoteType("Other")}>Other</option>
  //           </select>
  //         </div>
  //       </div>
  //       <div
  //         // onClick={() => (checkTheSubmitQuoteInput() ? submitNewQuote() : "")}
  //         className="submit-quote-form-button"
  //       >
  //         <h4>Submit</h4>
  //       </div>
  //     </div>
  //   );
  // };

  const thisTextInfo = () => {
    return (
      <div style={{ color: colorFiles.fontColor }}>
        <h4 style={{ margin: "2rem", marginBottom: 0 }}>This Text:</h4>
        <hr
          style={{
            marginTop: "1rem",
            backgroundColor: colorFiles.hrColor,
            width: "85%",
          }}
        ></hr>
        <h4 style={{ margin: "2rem", marginBottom: 0 }}>Highest</h4>
        <div
          style={{
            backgroundColor: colorFiles.primaryColor,
            color: colorFiles.contrastFontColor,
          }}
          className={" mb-4 mt-1 history-div"}
        >
          <div className={"d-flex justify-content-between  p-2"}>
            <p>{highestSpeed} WPM</p>
            <p>Date: {highestSpeedDate}</p>
          </div>
        </div>
        <h4 style={{ margin: "2rem", marginBottom: 0 }}>History</h4>
        {displayTheHistory()}
      </div>
    );
  };

  const sideMenu = () => {
    if (text !== undefined) {
      return (
        <div
          className={isSideMenuOpen ? "side-menu-open" : "side-menu-closed"}
          style={{
            backgroundColor: colorFiles.backgroundColor,
            color: colorFiles.fontColor,
          }}
        >
          <div>
            <div className="side-menu-header">
              <h3>Info About Text</h3>
              <i
                onClick={() => {
                  dispatch({
                    type: "TOGGLE_OPENING_SIDE_MENU",
                  });
                }}
                className="fas fa-times fa-2x close-icon"
              ></i>
            </div>

            <hr
              style={{
                marginTop: "1rem",
                backgroundColor: colorFiles.hrColor,
              }}
            ></hr>
          </div>
          <div className="side-menu-container">
            <div className="side-menu-picture-div">
              <img className="side-menu-picture" src={text.image}></img>
            </div>
            <hr
              style={{
                width: "85%",
                marginTop: "2rem",
                backgroundColor: colorFiles.hrColor,
              }}
            ></hr>
          </div>
          <div className="side-menu-info-container">
            <h5 className="mb-2">
              {/* This quote is from the {data.text[selectedRandomTextIndex].type}: */}
            </h5>
            <a className="link" target="blank" href={text.linkURL}>
              <h5
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                }}
                className="link-h5"
              >
                "{text.from}"
              </h5>
            </a>

            <h5 className="mt-2">By: {text.by}</h5>
            <div className="d-flex justify-content-center"></div>
          </div>
          {isLoggedIn && thisTextInfo()}
          {/* {isLoggedIn && (
            <div
              onClick={() => {
                setIsSubmitQuoteOpen(!isSubmitQuoteMenuOpen);
                dispatch({
                  type: "TOGGLE_OPENING_SIDE_MENU",
                });
              }}
              className="submit-quote-button "
            >
              <h5>Submit a Quote</h5>
            </div>
          )} */}
        </div>
      );
    }
  };

  const displayTheStatistics = () => {
    return (
      <div className="statistics">
        <div className="d-flex">
          <h5 className="mr-1">WPM: {displayWPM()} |</h5>
          <h5
            style={
              differenceInWPM > 0
                ? { color: "rgb(41, 230, 50)" }
                : { color: "rgba(230, 41, 41)" }
            }
          >
            {differenceInWPM > 0 ? `+${differenceInWPM}` : differenceInWPM}
          </h5>
        </div>
        <div className="d-flex">
          <div className="d-flex mr-5">
            <h5 className="mr-1">Errors: {latestErrors} |</h5>
            <h5
              style={
                differenceInErrors < 0
                  ? { color: "rgb(41, 230, 50)" }
                  : { color: "rgba(230, 41, 41)" }
              }
            >
              {differenceInErrors > 0
                ? `+${differenceInErrors}`
                : differenceInErrors}
            </h5>
          </div>
          <div className="d-flex">
            <h5 className="mr-2">Acuracy: </h5>
            <h5 style={accuracy > 96 ? { color: "rgb(41, 230, 50)" } : {}}>
              {accuracy === 0 ? "..." : `${accuracy}%`}
            </h5>
          </div>
        </div>
      </div>
    );
  };

  return (
    <animated.div style={animation} className={"TypingTest-page"}>
      <div
        onClick={() =>
          dispatch({
            type: "TOGGLE_OPENING_SIDE_MENU",
          })
        }
        className={
          isSideMenuOpen // isSubmitQuoteMenuOpen
            ? "darkened-background-on"
            : "darkened-background-off"
        }
      ></div>

      {/* {submitQuoteMenu()} */}
      {sideMenu()}
      <div
        style={{
          backgroundColor: colorFiles.backgroundColor,
          color: colorFiles.fontColor,
        }}
        className="TypingTest"
      >
        <Header />
        {displayTheStatistics()}
        {errorWarning()}
        {successWarning()}

        <hr
          style={
            finished || !isRunning
              ? { width: "100%", backgroundColor: colorFiles.primaryColor }
              : {
                  width: calculateWithOfProgressBar() + "%",
                  backgroundColor: colorFiles.primaryColor,
                }
          }
          className="hr-progress"
        ></hr>
        <p
          className={
            isRunning || finished
              ? "alert-primary alert-hidden"
              : "alert-primary alert-shown"
          }
        >
          {isUserTyping
            ? "Start typing... Start to type the text below whenever you are ready :)"
            : "Click on the input box to start typing."}
        </p>
        <p
          className={
            mistakesAlert
              ? "alert-danger alert-warning-shown"
              : "alert-danger alert-warning-hidden"
          }
        >
          <strong>Slow Down Boy</strong>
          the test won't stop unless you have less than 5 mistakes
        </p>
        <div className={isUserTyping ? "text-to-type" : "text-to-type-dark"}>
          {isLoading ? (
            <div
              style={{ color: colorFiles.fontColor }}
              className={"loading-div"}
            >
              <div class="lds-ellipsis">
                <div
                  style={{ background: colorFiles.fontColor }}
                  className={theme ? "loading-dot-dark" : "loading-dot-light"}
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className={theme ? "loading-dot-dark" : "loading-dot-light"}
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className={theme ? "loading-dot-dark" : "loading-dot-light"}
                ></div>
                <div
                  style={{ background: colorFiles.fontColor }}
                  className={theme ? "loading-dot-dark" : "loading-dot-light"}
                ></div>
              </div>
              <h4 style={{ color: colorFiles.fontColor }}>Loading Text</h4>
            </div>
          ) : (
            spanArray
          )}
        </div>
        <div
          className={finished ? "keyboard-div-hidden" : "keyboard-div-shown"}
        >
          {keyboardOnScreen && <Keyboard />}
        </div>
        <div
          style={{
            backgroundColor: colorFiles.secondaryBackgroundColor,
            color: colorFiles.fontColor,
          }}
          className={handleThemInTheFinishedPage()}
        >
          <div className="about-text-header">
            <h4>What you just typed:</h4>
            <div>
              <button
                onClick={() => {
                  setSpanArray(blankSpanArray);
                  setInfoAboutCharacter(blankInfoArray);
                  setFinished(false);
                  setSeconds(0);
                  setMinutes(0);
                  setTimeSeconds(0);
                  setCharactersTyped(0);
                  setIsRunning(false);
                  setMistakes(0);
                  setRealMistakes(0);
                  setProgress(1);
                  calculateAccuracy();
                }}
                className="btn btn-primary mr-3"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                }}
              >
                Type Again
              </button>
              <button
                onClick={() => {
                  setSpanArray(blankSpanArray);
                  setInfoAboutCharacter(blankInfoArray);
                  setFinished(false);
                  setNewGame(true);
                  setRealMistakes(0);
                  calculateAccuracy();
                }}
                className="btn btn-primary"
                style={{
                  backgroundColor: colorFiles.primaryColor,
                  color: colorFiles.contrastFontColor,
                }}
              >
                New Text
              </button>
            </div>
          </div>
          <div className="info-about-text-bottom">
            <div className="picture-div">
              <img className="picture-image" src={text && text.image}></img>
            </div>
            <div className="info-about-text-text">
              <hr
                style={{
                  marginTop: "1rem",
                  backgroundColor: colorFiles.hrColor,
                }}
              ></hr>
              <h5>
                This quote is from the {text && text.type}:{" "}
                <a
                  className={"linkURL"}
                  style={{ color: colorFiles.fontColor }}
                  target="blank"
                  href={text && text.linkURL}
                >
                  {text && text.from}
                </a>
              </h5>
              <br></br>
              <h5>By: {text && text.by}</h5>
              <br></br>
              <h5>
                Your time:{" "}
                {seconds < 10
                  ? `${minutes}:0${seconds}`
                  : `${minutes}:${seconds}`}
              </h5>
            </div>
          </div>
        </div>
        <div className="input-zone">
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
            placeholder="The test will bigin when you start typing!"
            className={finished ? "input-box-hidden" : "input-box-shown"}
            style={{
              color: colorFiles.fontColor,
              borderBottom: `2px solid ${colorFiles.primaryColor}`,
            }}
          ></input>
          <p className="alert-warning alert-tip">
            <strong>Tip:</strong> you can type //f to finish the current game.
          </p>
        </div>
      </div>
    </animated.div>
  );
}

export default TypingTest;
