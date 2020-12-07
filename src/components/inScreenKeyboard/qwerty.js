import React from "react";
import "./keyboard.css";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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

function Qwerty() {
  const dispatch = useDispatch();
  const ALL_KEYS_PRESSED = useSelector((state) => state.allKeysPressed);

  const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  const jwt = useSelector((state) => state.JWTreducer);

  const [pressed_A_Count, setPressed_A_Count] = useState(ALL_KEYS_PRESSED.a);
  const [pressed_B_Count, setPressed_B_Count] = useState(ALL_KEYS_PRESSED.b);
  const [pressed_C_Count, setPressed_C_Count] = useState(ALL_KEYS_PRESSED.c);
  const [pressed_D_Count, setPressed_D_Count] = useState(ALL_KEYS_PRESSED.d);
  const [pressed_E_Count, setPressed_E_Count] = useState(ALL_KEYS_PRESSED.e);
  const [pressed_F_Count, setPressed_F_Count] = useState(ALL_KEYS_PRESSED.f);
  const [pressed_G_Count, setPressed_G_Count] = useState(ALL_KEYS_PRESSED.g);
  const [pressed_H_Count, setPressed_H_Count] = useState(ALL_KEYS_PRESSED.h);
  const [pressed_I_Count, setPressed_I_Count] = useState(ALL_KEYS_PRESSED.i);
  const [pressed_J_Count, setPressed_J_Count] = useState(ALL_KEYS_PRESSED.j);
  const [pressed_K_Count, setPressed_K_Count] = useState(ALL_KEYS_PRESSED.k);
  const [pressed_L_Count, setPressed_L_Count] = useState(ALL_KEYS_PRESSED.l);
  const [pressed_M_Count, setPressed_M_Count] = useState(ALL_KEYS_PRESSED.m);
  const [pressed_N_Count, setPressed_N_Count] = useState(ALL_KEYS_PRESSED.n);
  const [pressed_O_Count, setPressed_O_Count] = useState(ALL_KEYS_PRESSED.o);
  const [pressed_P_Count, setPressed_P_Count] = useState(ALL_KEYS_PRESSED.p);
  const [pressed_Q_Count, setPressed_Q_Count] = useState(ALL_KEYS_PRESSED.q);
  const [pressed_R_Count, setPressed_R_Count] = useState(ALL_KEYS_PRESSED.r);
  const [pressed_S_Count, setPressed_S_Count] = useState(ALL_KEYS_PRESSED.s);
  const [pressed_T_Count, setPressed_T_Count] = useState(ALL_KEYS_PRESSED.t);
  const [pressed_U_Count, setPressed_U_Count] = useState(ALL_KEYS_PRESSED.u);
  const [pressed_V_Count, setPressed_V_Count] = useState(ALL_KEYS_PRESSED.v);
  const [pressed_W_Count, setPressed_W_Count] = useState(ALL_KEYS_PRESSED.w);
  const [pressed_X_Count, setPressed_X_Count] = useState(ALL_KEYS_PRESSED.x);
  const [pressed_Y_Count, setPressed_Y_Count] = useState(ALL_KEYS_PRESSED.y);
  const [pressed_Z_Count, setPressed_Z_Count] = useState(ALL_KEYS_PRESSED.z);
  const [pressed_1_Count, setPressed_1_Count] = useState(ALL_KEYS_PRESSED.ONE);
  const [pressed_2_Count, setPressed_2_Count] = useState(ALL_KEYS_PRESSED.TWO);
  const [pressed_3_Count, setPressed_3_Count] = useState(
    ALL_KEYS_PRESSED.THREE
  );
  const [pressed_4_Count, setPressed_4_Count] = useState(ALL_KEYS_PRESSED.FOUR);
  const [pressed_5_Count, setPressed_5_Count] = useState(ALL_KEYS_PRESSED.FIVE);
  const [pressed_6_Count, setPressed_6_Count] = useState(ALL_KEYS_PRESSED.SIX);
  const [pressed_7_Count, setPressed_7_Count] = useState(
    ALL_KEYS_PRESSED.SEVEN
  );
  const [pressed_8_Count, setPressed_8_Count] = useState(
    ALL_KEYS_PRESSED.EIGHT
  );
  const [pressed_9_Count, setPressed_9_Count] = useState(ALL_KEYS_PRESSED.NINE);
  const [pressed_0_Count, setPressed_0_Count] = useState(ALL_KEYS_PRESSED.ZERO);
  const [pressed_Space_Count, setPressed_Space_Count] = useState(
    ALL_KEYS_PRESSED.Shift
  );
  const [pressed_Shift_Count, setPressed_Shift_Count] = useState(
    ALL_KEYS_PRESSED.Space
  );
  const [pressed_Dot_Count, setPressed_Dot_Count] = useState(
    ALL_KEYS_PRESSED.Dot
  );
  const [pressed_Comma_Count, setPressed_Comma_Count] = useState(
    ALL_KEYS_PRESSED.Comma
  );

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      axios
        .get("https://protypist.herokuapp.com/users/getKeysTyped", {
          headers: headers,
        })
        .then((response) => {
          console.log(response.data.a);
          setPressed_A_Count(response.data.a);
          setPressed_B_Count(response.data.b);
          setPressed_C_Count(response.data.c);
          setPressed_D_Count(response.data.d);
          setPressed_E_Count(response.data.e);
          setPressed_F_Count(response.data.f);
          setPressed_G_Count(response.data.g);
          setPressed_H_Count(response.data.h);
          setPressed_I_Count(response.data.i);
          setPressed_J_Count(response.data.j);
          setPressed_K_Count(response.data.k);
          setPressed_L_Count(response.data.l);
          setPressed_M_Count(response.data.m);
          setPressed_N_Count(response.data.n);
          setPressed_O_Count(response.data.o);
          setPressed_P_Count(response.data.p);
          setPressed_Q_Count(response.data.q);
          setPressed_R_Count(response.data.r);
          setPressed_S_Count(response.data.s);
          setPressed_T_Count(response.data.t);
          setPressed_U_Count(response.data.u);
          setPressed_V_Count(response.data.v);
          setPressed_W_Count(response.data.w);
          setPressed_X_Count(response.data.x);
          setPressed_Y_Count(response.data.y);
          setPressed_Z_Count(response.data.z);
          setPressed_1_Count(response.data.ONE);
          setPressed_2_Count(response.data.TWO);
          setPressed_3_Count(response.data.THREE);
          setPressed_4_Count(response.data.FOUR);
          setPressed_5_Count(response.data.FIVE);
          setPressed_6_Count(response.data.SIX);
          setPressed_7_Count(response.data.SEVEN);
          setPressed_8_Count(response.data.EIGHT);
          setPressed_9_Count(response.data.NINE);
          setPressed_0_Count(response.data.ZERO);
          setPressed_Space_Count(response.data.Space);
          setPressed_Shift_Count(response.data.Shift);
          setPressed_Comma_Count(response.data.Comma);
          setPressed_Dot_Count(response.data.Dot);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [jwt, isLoggedIn]);

  const [hoveredA, setHoveredA] = useState(false);
  const [hoveredB, setHoveredB] = useState(false);
  const [hoveredC, setHoveredC] = useState(false);
  const [hoveredD, setHoveredD] = useState(false);
  const [hoveredE, setHoveredE] = useState(false);
  const [hoveredF, setHoveredF] = useState(false);
  const [hoveredG, setHoveredG] = useState(false);
  const [hoveredH, setHoveredH] = useState(false);
  const [hoveredI, setHoveredI] = useState(false);
  const [hoveredJ, setHoveredJ] = useState(false);
  const [hoveredK, setHoveredK] = useState(false);
  const [hoveredL, setHoveredL] = useState(false);
  const [hoveredM, setHoveredM] = useState(false);
  const [hoveredN, setHoveredN] = useState(false);
  const [hoveredO, setHoveredO] = useState(false);
  const [hoveredP, setHoveredP] = useState(false);
  const [hoveredQ, setHoveredQ] = useState(false);
  const [hoveredR, setHoveredR] = useState(false);
  const [hoveredS, setHoveredS] = useState(false);
  const [hoveredT, setHoveredT] = useState(false);
  const [hoveredU, setHoveredU] = useState(false);
  const [hoveredV, setHoveredV] = useState(false);
  const [hoveredW, setHoveredW] = useState(false);
  const [hoveredX, setHoveredX] = useState(false);
  const [hoveredY, setHoveredY] = useState(false);
  const [hoveredZ, setHoveredZ] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const [hovered4, setHovered4] = useState(false);
  const [hovered5, setHovered5] = useState(false);
  const [hovered6, setHovered6] = useState(false);
  const [hovered7, setHovered7] = useState(false);
  const [hovered8, setHovered8] = useState(false);
  const [hovered9, setHovered9] = useState(false);
  const [hovered0, setHovered0] = useState(false);
  const [hoveredSpace, setHoveredSpace] = useState(false);
  const [hoveredShift, setHoveredShift] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(false);
  const [hoveredComma, setHoveredComma] = useState(false);

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

  useEffect(() => {
    if (pressedA || pressedCapitalA) {
      setPressed_A_Count((pressed) => (pressed = pressed_A_Count + 1));
    } else if (pressedB || pressedCapitalB) {
      setPressed_B_Count((pressed) => (pressed = pressed_B_Count + 1));
    } else if (pressedC || pressedCapitalC) {
      setPressed_C_Count((pressed) => (pressed = pressed_C_Count + 1));
    } else if (pressedD || pressedCapitalD) {
      setPressed_D_Count((pressed) => (pressed = pressed_D_Count + 1));
    } else if (pressedE || pressedCapitalE) {
      setPressed_E_Count((pressed) => (pressed = pressed_E_Count + 1));
    } else if (pressedF || pressedCapitalF) {
      setPressed_F_Count((pressed) => (pressed = pressed_F_Count + 1));
    } else if (pressedG || pressedCapitalG) {
      setPressed_G_Count((pressed) => (pressed = pressed_G_Count + 1));
    } else if (pressedH || pressedCapitalH) {
      setPressed_H_Count((pressed) => (pressed = pressed_H_Count + 1));
    } else if (pressedI || pressedCapitalI) {
      setPressed_I_Count((pressed) => (pressed = pressed_I_Count + 1));
    } else if (pressedJ || pressedCapitalJ) {
      setPressed_J_Count((pressed) => (pressed = pressed_J_Count + 1));
    } else if (pressedK || pressedCapitalK) {
      setPressed_K_Count((pressed) => (pressed = pressed_K_Count + 1));
    } else if (pressedL || pressedCapitalL) {
      setPressed_L_Count((pressed) => (pressed = pressed_L_Count + 1));
    } else if (pressedM || pressedCapitalM) {
      setPressed_M_Count((pressed) => (pressed = pressed_M_Count + 1));
    } else if (pressedN || pressedCapitalN) {
      setPressed_N_Count((pressed) => (pressed = pressed_N_Count + 1));
    } else if (pressedO || pressedCapitalO) {
      setPressed_O_Count((pressed) => (pressed = pressed_O_Count + 1));
    } else if (pressedP || pressedCapitalP) {
      setPressed_P_Count((pressed) => (pressed = pressed_P_Count + 1));
    } else if (pressedQ || pressedCapitalQ) {
      setPressed_Q_Count((pressed) => (pressed = pressed_Q_Count + 1));
    } else if (pressedR || pressedCapitalR) {
      setPressed_R_Count((pressed) => (pressed = pressed_R_Count + 1));
    } else if (pressedS || pressedCapitalS) {
      setPressed_S_Count((pressed) => (pressed = pressed_S_Count + 1));
    } else if (pressedT || pressedCapitalT) {
      setPressed_T_Count((pressed) => (pressed = pressed_T_Count + 1));
    } else if (pressedU || pressedCapitalU) {
      setPressed_U_Count((pressed) => (pressed = pressed_U_Count + 1));
    } else if (pressedV || pressedCapitalV) {
      setPressed_V_Count((pressed) => (pressed = pressed_V_Count + 1));
    } else if (pressedW || pressedCapitalW) {
      setPressed_W_Count((pressed) => (pressed = pressed_W_Count + 1));
    } else if (pressedX || pressedCapitalX) {
      setPressed_X_Count((pressed) => (pressed = pressed_X_Count + 1));
    } else if (pressedY || pressedCapitalY) {
      setPressed_Y_Count((pressed) => (pressed = pressed_Y_Count + 1));
    } else if (pressedZ || pressedCapitalZ) {
      setPressed_Z_Count((pressed) => (pressed = pressed_Z_Count + 1));
    } else if (pressed1) {
      setPressed_1_Count((pressed) => (pressed = pressed_1_Count + 1));
    } else if (pressed2) {
      setPressed_2_Count((pressed) => (pressed = pressed_2_Count + 1));
    } else if (pressed3) {
      setPressed_3_Count((pressed) => (pressed = pressed_3_Count + 1));
    } else if (pressed4) {
      setPressed_4_Count((pressed) => (pressed = pressed_4_Count + 1));
    } else if (pressed5) {
      setPressed_5_Count((pressed) => (pressed = pressed_5_Count + 1));
    } else if (pressed6) {
      setPressed_6_Count((pressed) => (pressed = pressed_6_Count + 1));
    } else if (pressed7) {
      setPressed_7_Count((pressed) => (pressed = pressed_7_Count + 1));
    } else if (pressed8) {
      setPressed_8_Count((pressed) => (pressed = pressed_8_Count + 1));
    } else if (pressed9) {
      setPressed_9_Count((pressed) => (pressed = pressed_9_Count + 1));
    } else if (pressed0) {
      setPressed_0_Count((pressed) => (pressed = pressed_0_Count + 1));
    } else if (pressedShift) {
      setPressed_Shift_Count((pressed) => (pressed = pressed_Shift_Count + 1));
    } else if (pressedSpace) {
      setPressed_Space_Count((pressed) => (pressed = pressed_Space_Count + 1));
    } else if (pressedDot) {
      setPressed_Dot_Count((pressed) => (pressed = pressed_Dot_Count + 1));
    } else if (pressedComma) {
      setPressed_Comma_Count((pressed) => (pressed = pressed_Comma_Count + 1));
    }
  }, [
    pressedA,
    pressedCapitalA,
    pressedB,
    pressedCapitalB,
    pressedC,
    pressedCapitalC,
    pressedD,
    pressedCapitalD,
    pressedE,
    pressedCapitalE,
    pressedF,
    pressedCapitalF,
    pressedG,
    pressedCapitalG,
    pressedH,
    pressedCapitalH,
    pressedI,
    pressedCapitalI,
    pressedJ,
    pressedCapitalJ,
    pressedK,
    pressedCapitalK,
    pressedL,
    pressedCapitalL,
    pressedM,
    pressedCapitalM,
    pressedN,
    pressedCapitalN,
    pressedO,
    pressedCapitalO,
    pressedP,
    pressedCapitalP,
    pressedQ,
    pressedCapitalQ,
    pressedR,
    pressedCapitalR,
    pressedS,
    pressedCapitalS,
    pressedT,
    pressedCapitalT,
    pressedU,
    pressedCapitalU,
    pressedV,
    pressedCapitalV,
    pressedW,
    pressedCapitalW,
    pressedX,
    pressedCapitalX,
    pressedY,
    pressedCapitalY,
    pressedZ,
    pressedCapitalZ,
    pressed1,
    pressed2,
    pressed3,
    pressed4,
    pressed5,
    pressed6,
    pressed7,
    pressed8,
    pressed9,
    pressed0,
    pressedShift,
    pressedSpace,
    pressedComma,
    pressedDot,
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      const headers = { Authorization: jwt };

      const data = {
        payload: {
          a: pressed_A_Count,
          b: pressed_B_Count,
          c: pressed_C_Count,
          d: pressed_D_Count,
          e: pressed_E_Count,
          f: pressed_F_Count,
          g: pressed_G_Count,
          h: pressed_H_Count,
          i: pressed_I_Count,
          j: pressed_J_Count,
          k: pressed_K_Count,
          l: pressed_L_Count,
          m: pressed_M_Count,
          n: pressed_N_Count,
          o: pressed_O_Count,
          p: pressed_P_Count,
          q: pressed_Q_Count,
          r: pressed_R_Count,
          s: pressed_S_Count,
          t: pressed_T_Count,
          u: pressed_U_Count,
          v: pressed_V_Count,
          w: pressed_W_Count,
          x: pressed_X_Count,
          y: pressed_Y_Count,
          z: pressed_Z_Count,
          ONE: pressed_1_Count,
          TWO: pressed_2_Count,
          THREE: pressed_3_Count,
          FOUR: pressed_4_Count,
          FIVE: pressed_5_Count,
          SIX: pressed_6_Count,
          SEVEN: pressed_7_Count,
          EIGHT: pressed_8_Count,
          NINE: pressed_9_Count,
          ZERO: pressed_0_Count,
          Space: pressed_Space_Count,
          Shift: pressed_Shift_Count,
          Dot: pressed_Dot_Count,
          Comma: pressed_Comma_Count,
        },
      };

      axios
        .post("https://protypist.herokuapp.com/users/keysTyped", data, {
          headers: headers,
        })
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });
    }

    dispatch({
      type: "SET_KEYS_PRESSED",
      payload: {
        a: pressed_A_Count,
        b: pressed_B_Count,
        c: pressed_C_Count,
        d: pressed_D_Count,
        e: pressed_E_Count,
        f: pressed_F_Count,
        g: pressed_G_Count,
        h: pressed_H_Count,
        i: pressed_I_Count,
        j: pressed_J_Count,
        k: pressed_K_Count,
        l: pressed_L_Count,
        m: pressed_M_Count,
        n: pressed_N_Count,
        o: pressed_O_Count,
        p: pressed_P_Count,
        q: pressed_Q_Count,
        r: pressed_R_Count,
        s: pressed_S_Count,
        t: pressed_T_Count,
        u: pressed_U_Count,
        v: pressed_V_Count,
        w: pressed_W_Count,
        x: pressed_X_Count,
        y: pressed_Y_Count,
        z: pressed_Z_Count,
        ONE: pressed_1_Count,
        TWO: pressed_2_Count,
        THREE: pressed_3_Count,
        FOUR: pressed_4_Count,
        FIVE: pressed_5_Count,
        SIX: pressed_6_Count,
        SEVEN: pressed_7_Count,
        EIGHT: pressed_8_Count,
        NINE: pressed_9_Count,
        ZERO: pressed_0_Count,
        Space: pressed_Space_Count,
        Shift: pressed_Shift_Count,
        Dot: pressed_Dot_Count,
        Comma: pressed_Comma_Count,
      },
    });
  }, [pressedSpace]);

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
            onMouseOver={() => setHovered1(true)}
            onMouseOut={() => setHovered1(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered1 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.ONE}x
            </div>
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
            onMouseOver={() => setHovered2(true)}
            onMouseOut={() => setHovered2(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered2 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.TWO}x
            </div>
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
            onMouseOver={() => setHovered3(true)}
            onMouseOut={() => setHovered3(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered3 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.THREE}x
            </div>
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
            onMouseOver={() => setHovered4(true)}
            onMouseOut={() => setHovered4(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered4 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.FOUR}x
            </div>
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
            onMouseOver={() => setHovered5(true)}
            onMouseOut={() => setHovered5(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered5 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.FIVE}x
            </div>
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
            onMouseOver={() => setHovered6(true)}
            onMouseOut={() => setHovered6(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered6 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.SIX}x
            </div>
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
            onMouseOver={() => setHovered7(true)}
            onMouseOut={() => setHovered7(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered7 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.SEVEN}x
            </div>
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
            onMouseOver={() => setHovered8(true)}
            onMouseOut={() => setHovered8(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered8 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.EIGHT}x
            </div>
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
            onMouseOver={() => setHovered9(true)}
            onMouseOut={() => setHovered9(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered9 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.NINE}x
            </div>
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
            onMouseOver={() => setHovered0(true)}
            onMouseOut={() => setHovered0(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hovered0 ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.ZERO}x
            </div>
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
            - _
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
            = +
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
            onMouseOver={() => setHoveredQ(true)}
            onMouseOut={() => setHoveredQ(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredQ ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.q}x
            </div>
            Q
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
            onMouseOver={() => setHoveredW(true)}
            onMouseOut={() => setHoveredW(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredW ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.w}x
            </div>
            W
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
            onMouseOver={() => setHoveredE(true)}
            onMouseOut={() => setHoveredE(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredE ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.e}x
            </div>
            E
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
            onMouseOver={() => setHoveredR(true)}
            onMouseOut={() => setHoveredR(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredR ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.r}x
            </div>
            R
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
            onMouseOver={() => setHoveredT(true)}
            onMouseOut={() => setHoveredT(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredT ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.t}x
            </div>
            T
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
            onMouseOver={() => setHoveredY(true)}
            onMouseOut={() => setHoveredY(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredY ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.y}x
            </div>
            Y
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
            onMouseOver={() => setHoveredU(true)}
            onMouseOut={() => setHoveredU(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredU ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.u}x
            </div>
            U
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
            onMouseOver={() => setHoveredI(true)}
            onMouseOut={() => setHoveredI(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredI ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.i}x
            </div>
            I
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
            onMouseOver={() => setHoveredO(true)}
            onMouseOut={() => setHoveredO(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredO ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.o}x
            </div>
            O
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
            onMouseOver={() => setHoveredP(true)}
            onMouseOut={() => setHoveredP(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredP ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.p}x
            </div>
            P
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
            [{" {"}
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
            ]{" }"}
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
            onMouseOver={() => setHoveredA(true)}
            onMouseOut={() => setHoveredA(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredA ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.a}x
            </div>
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
            onMouseOver={() => setHoveredS(true)}
            onMouseOut={() => setHoveredS(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredS ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.s}x
            </div>
            S
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
            onMouseOver={() => setHoveredD(true)}
            onMouseOut={() => setHoveredD(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredD ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.d}x
            </div>
            D
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
            onMouseOver={() => setHoveredF(true)}
            onMouseOut={() => setHoveredF(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredF ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.f}x
            </div>
            F
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
            onMouseOver={() => setHoveredG(true)}
            onMouseOut={() => setHoveredG(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredG ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.g}x
            </div>
            G
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
            onMouseOver={() => setHoveredH(true)}
            onMouseOut={() => setHoveredH(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredH ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.h}x
            </div>
            H
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
            onMouseOver={() => setHoveredJ(true)}
            onMouseOut={() => setHoveredJ(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredJ ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.j}x
            </div>
            J
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
            onMouseOver={() => setHoveredK(true)}
            onMouseOut={() => setHoveredK(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredK ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.k}x
            </div>
            K
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
            onMouseOver={() => setHoveredL(true)}
            onMouseOut={() => setHoveredL(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredL ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.l}x
            </div>
            L
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
            ; :
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
            ' "
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
            onMouseOver={() => setHoveredShift(true)}
            onMouseOut={() => setHoveredShift(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredShift ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.Shift}x
            </div>
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
            onMouseOver={() => setHoveredZ(true)}
            onMouseOut={() => setHoveredZ(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredZ ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.z}x
            </div>
            Z
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
            onMouseOver={() => setHoveredX(true)}
            onMouseOut={() => setHoveredX(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredX ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.x}x
            </div>
            X
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
            onMouseOver={() => setHoveredC(true)}
            onMouseOut={() => setHoveredC(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredC ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.c}x
            </div>
            C
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
            onMouseOver={() => setHoveredV(true)}
            onMouseOut={() => setHoveredV(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredV ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.v}x
            </div>
            V
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
            onMouseOver={() => setHoveredB(true)}
            onMouseOut={() => setHoveredB(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredB ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.b}x
            </div>
            B
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
            onMouseOver={() => setHoveredN(true)}
            onMouseOut={() => setHoveredN(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredN ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.n}x
            </div>
            N
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
            onMouseOver={() => setHoveredM(true)}
            onMouseOut={() => setHoveredM(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredM ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.m}x
            </div>
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
            onMouseOver={() => setHoveredComma(true)}
            onMouseOut={() => setHoveredComma(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredComma ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.Comma}x
            </div>
            ,{" <"}
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
            onMouseOver={() => setHoveredDot(true)}
            onMouseOut={() => setHoveredDot(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredDot ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.Dot}x
            </div>
            .{" >"}
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
            / ?
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
            onMouseOver={() => setHoveredSpace(true)}
            onMouseOut={() => setHoveredSpace(false)}
          >
            <div
              style={{
                backgroundColor: colorFiles.secondaryBackgroundColor,
                color: colorFiles.fontColor,
              }}
              className={hoveredSpace ? "popup" : "hidden-popup"}
            >
              {ALL_KEYS_PRESSED.Space}x
            </div>
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

export default Qwerty;
