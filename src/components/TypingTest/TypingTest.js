import React, { useState, useEffect } from "react";
import "./TypingTest.css";
import Header from "../header/header";
import { useSelector } from "react-redux";

function TypingTest() {
  const theme = useSelector((state) => state.darkModeReducer);
  //state
  const [text, setText] = useState(
    "Once upon a time there was a car that was so fast that no other car never even came closw to such high speeds, thats it."
  );
  const [textArrayCharacters, setTextArrayCharacters] = useState();
  const [infoAboutCharacter, setInfoAboutCharacter] = useState();

  useEffect(() => {
    const splitedText = text.split("");

    let infoAboutCharacterObject = [];
    splitedText.map((character, index) => {
      let object = "null";
      infoAboutCharacterObject.push(object);
    });

    setTextArrayCharacters(splitedText);
    setInfoAboutCharacter(infoAboutCharacterObject);
  }, []);

  const displayTheArray = () => {
    if (textArrayCharacters !== undefined) {
      const newArray = textArrayCharacters.map((character, index) => {
        return (
          <span className={`span-${index}`} key={index}>
            {character}
          </span>
        );
      });
      return newArray;
    }
  };

  const getAndCheckTheInput = (e) => {
    if (textArrayCharacters !== undefined) {
      if (
        e.target.value[e.target.value.length - 1] ===
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = true;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
        console.log(array);
      } else if (
        e.target.value[e.target.value.length - 1] !==
        textArrayCharacters[e.target.value.length - 1]
      ) {
        let array = [...infoAboutCharacter];
        let arrayItem = array[e.target.value.length - 1];
        arrayItem = false;
        array[e.target.value.length - 1] = arrayItem;
        setInfoAboutCharacter(array);
        console.log(array);
      }
    }
  };

  return (
    <div className={theme ? "TypingTest-page-dark" : "TypingTest-page-light"}>
      <div className="TypingTest">
        <Header text="Improve your typing skills" />
        <div className="text-to-type">
          <h2>{displayTheArray()}</h2>
        </div>
        <div className="input-zone">
          <h2>Type the text above </h2>
          <input
            onChange={getAndCheckTheInput}
            placeholder="The test will bigin when you start typing!"
            className="input-box"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default TypingTest;
