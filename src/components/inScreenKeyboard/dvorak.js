import React from "react";
import "./keyboard.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    setTimeout(() => {
      if (keyPressed === true) {
        setKeyPressed(false);
      }
    }, 300);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyPressed]);

  return keyPressed;
}

function Dvorak() {
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`../themes/${colors}`);
  const pressedA = useKeyPress("a");
  const pressedCapitalA = useKeyPress("A");
  const pressedB = useKeyPress("b");
  const pressedCapitalB = useKeyPress("B");
  const pressedC = useKeyPress("c");
  const pressedCapitalC = useKeyPress("C");
  const pressedD = useKeyPress("d");
  const pressedCapitalD = useKeyPress("D");
  const pressedE = useKeyPress("e");
  const pressedCapitalE = useKeyPress("E");
  const pressedF = useKeyPress("f");
  const pressedCapitalF = useKeyPress("F");
  const pressedG = useKeyPress("g");
  const pressedCapitalG = useKeyPress("G");
  const pressedH = useKeyPress("h");
  const pressedCapitalH = useKeyPress("H");
  const pressedI = useKeyPress("i");
  const pressedCapitalI = useKeyPress("I");
  const pressedJ = useKeyPress("j");
  const pressedCapitalJ = useKeyPress("J");
  const pressedK = useKeyPress("k");
  const pressedCapitalK = useKeyPress("K");
  const pressedL = useKeyPress("l");
  const pressedCapitalL = useKeyPress("L");
  const pressedM = useKeyPress("m");
  const pressedCapitalM = useKeyPress("M");
  const pressedN = useKeyPress("n");
  const pressedCapitalN = useKeyPress("N");
  const pressedO = useKeyPress("o");
  const pressedCapitalO = useKeyPress("O");
  const pressedP = useKeyPress("p");
  const pressedCapitalP = useKeyPress("P");
  const pressedQ = useKeyPress("q");
  const pressedCapitalQ = useKeyPress("Q");
  const pressedR = useKeyPress("r");
  const pressedCapitalR = useKeyPress("R");
  const pressedS = useKeyPress("s");
  const pressedCapitalS = useKeyPress("S");
  const pressedT = useKeyPress("t");
  const pressedCapitalT = useKeyPress("T");
  const pressedU = useKeyPress("u");
  const pressedCapitalU = useKeyPress("U");
  const pressedV = useKeyPress("v");
  const pressedCapitalV = useKeyPress("V");
  const pressedW = useKeyPress("w");
  const pressedCapitalW = useKeyPress("W");
  const pressedX = useKeyPress("x");
  const pressedCapitalX = useKeyPress("X");
  const pressedY = useKeyPress("y");
  const pressedCapitalY = useKeyPress("Y");
  const pressedZ = useKeyPress("z");
  const pressedCapitalZ = useKeyPress("Z");

  const pressed1 = useKeyPress("1");
  const pressed2 = useKeyPress("2");
  const pressed3 = useKeyPress("3");
  const pressed4 = useKeyPress("4");
  const pressed5 = useKeyPress("5");
  const pressed6 = useKeyPress("6");
  const pressed7 = useKeyPress("7");
  const pressed8 = useKeyPress("8");
  const pressed9 = useKeyPress("9");
  const pressed0 = useKeyPress("0");

  const pressedSpace = useKeyPress(" ");
  const pressedLeftSquareBracket = useKeyPress("[");
  const pressedRigthSquareBracket = useKeyPress("]");
  const pressedRigthCurlyBrace = useKeyPress("}");
  const pressedLeftCurlyBrace = useKeyPress("{");
  const pressedBackTic = useKeyPress("`");
  const pressedExclamation = useKeyPress("!");
  const pressedAdd = useKeyPress("@");
  const pressedSharp = useKeyPress("#");
  const pressedDollar = useKeyPress("$");
  const pressedPerCent = useKeyPress("%");
  const pressedUpArrow = useKeyPress("^");
  const pressedAnd = useKeyPress("&");
  const pressedStart = useKeyPress("*");
  const pressedOpenParenthesis = useKeyPress("(");
  const pressedCloseParenthesis = useKeyPress(")");
  const pressedMinus = useKeyPress("-");
  const pressedUnderScore = useKeyPress("_");
  const pressedEqual = useKeyPress("=");
  const pressedPlus = useKeyPress("+");
  const pressedAproximate = useKeyPress("~");
  const pressedColon = useKeyPress(":");
  const pressedSemiColon = useKeyPress(";");
  const pressedSingleQuote = useKeyPress("'");
  const pressedDoubleQuote = useKeyPress(`"`);
  const pressedComma = useKeyPress(",");
  const pressedDot = useKeyPress(".");
  const pressedLesserThan = useKeyPress("<");
  const pressedBiggerThan = useKeyPress(">");
  const pressedForwardSlash = useKeyPress("/");
  const pressedQuestion = useKeyPress("?");
  const pressedBackSpace = useKeyPress("Backspace");
  const pressedShift = useKeyPress("Shift");

  return (
    <div>
      <div
        style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
        className="keyboard"
      >
        <div className="fifth-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedAproximate || pressedBackTic
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            `~
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed1 || pressedExclamation
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            1 !
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed2 || pressedAdd ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            2 @
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed3 || pressedSharp ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            3 #
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed4 || pressedDollar
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            4 $
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed5 || pressedPerCent
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            5 %
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed6 || pressedUpArrow
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            6 ^
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed7 || pressedAnd ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            7 &
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed8 || pressedStart ? "keyboard-key-pressed" : "keyboard-key"
            }
          >
            8 *
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed9 || pressedOpenParenthesis
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            9 (
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressed0 || pressedCloseParenthesis
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            0 )
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedMinus || pressedUnderScore
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            {"{ ["}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedEqual || pressedPlus
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            {"} ]"}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedBackSpace
                ? "keyboard-backspace-pressed"
                : "keyboard-backspace"
            }
          >
            Backspace
          </div>
        </div>
        <div className="forth-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-tab"
          >
            TAB
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedQ || pressedCapitalQ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            " '
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedW || pressedCapitalW
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            {"< ,"}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedE || pressedCapitalE
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            {"> ."}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedR || pressedCapitalR
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            P
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedT || pressedCapitalT
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Y
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedY || pressedCapitalY
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            F
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedU || pressedCapitalU
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            G
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedI || pressedCapitalI
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            C
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedO || pressedCapitalO
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            R
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedP || pressedCapitalP
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            L
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedLeftCurlyBrace || pressedLeftSquareBracket
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            {"? /"}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedRigthCurlyBrace || pressedRigthSquareBracket
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            {"+ ="}
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={pressedQ ? "keyboard-key-pressed" : "keyboard-key"}
          >
            \ |
          </div>
        </div>
        <div className="third-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-caps"
          >
            CAPS
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedA || pressedCapitalA
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            A
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedS || pressedCapitalS
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            O
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedD || pressedCapitalD
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            E
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedF || pressedCapitalF
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            U
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedG || pressedCapitalG
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            I
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedH || pressedCapitalH
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            D
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedJ || pressedCapitalJ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            H
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedK || pressedCapitalK
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            T
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedL || pressedCapitalL
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            N
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedColon || pressedSemiColon
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            S
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedSingleQuote || pressedDoubleQuote
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            _-
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-enter"
          >
            ENTER
          </div>
        </div>
        <div className="second-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedShift ? "keyboard-shift-pressed" : "keyboard-shift"
            }
          >
            SHIFT
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedZ || pressedCapitalZ
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            : ;
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedX || pressedCapitalX
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Q
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedC || pressedCapitalC
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            J
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedV || pressedCapitalV
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            K
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedB || pressedCapitalB
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            X
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedN || pressedCapitalN
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            B
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedM || pressedCapitalM
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            M
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedComma || pressedLesserThan
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            W
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedDot || pressedBiggerThan
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            V
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedForwardSlash || pressedQuestion
                ? "keyboard-key-pressed"
                : "keyboard-key"
            }
          >
            Z
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={"keyboard-big-shift"}
          >
            SHIFT
          </div>
        </div>
        <div className="first-row">
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-ctrl"
          >
            CTRL
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-alt"
          >
            ALT
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className={
              pressedSpace ? "keyboard-space-pressed" : "keyboard-space"
            }
          >
            SPACE
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-alt"
          >
            ALT
          </div>
          <div
            style={{
              backgroundColor: colorFiles.secondSecondaryBackgroundColor,
              color: colorFiles.fontColor,
            }}
            className="keyboard-ctrl"
          >
            CTRL
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dvorak;
