import React from "react";

const displayTheArray = (
  textArrayCharacters,
  charactersTyped,
  colorFiles,
  infoAboutCharacter
) => {
  if (textArrayCharacters !== undefined) {
    let spanArray = [];
    let wordArr = [];
    console.log(textArrayCharacters);

    for (let i = 0; i <= textArrayCharacters.length; i++) {
      if (textArrayCharacters[i] === " " || i === textArrayCharacters.length) {
        spanArray.push(
          <div style={{ display: "flex" }} className="word">
            {wordArr}
          </div>
        );
        wordArr = [];
      }

      if (i === charactersTyped) {
        wordArr.push(
          <div
            key={"key" + i}
            className={"blinking"}
            style={{
              color: colorFiles.noneColor,
              borderLeft: `2px solid ${colorFiles.fontColor}`,
            }}
          >
            {textArrayCharacters[i]}
          </div>
        );
      } else if (infoAboutCharacter[i] === true) {
        wordArr.push(
          <div
            key={"key" + i}
            className="green"
            style={{ color: colorFiles.correctColor }}
          >
            {textArrayCharacters[i]}
          </div>
        );
      } else if (infoAboutCharacter[i] === false) {
        wordArr.push(
          <div
            key={"key" + i}
            className="red"
            style={{
              color: colorFiles.wrongColor,
              borderBottom: `2px solid ${colorFiles.wrongColor}`,
            }}
          >
            {textArrayCharacters[i]}
          </div>
        );
      } else {
        wordArr.push(
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
    console.log(spanArray);
    return spanArray;
  }
};

export default displayTheArray;
