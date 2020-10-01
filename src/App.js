import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

//components
import TypingTest from "./components/TypingTest/TypingTest";
// import Typing10second from "./components/10second/10second";
import Common200 from "./components/200/common200";
import Common1000 from "./components/1000/common1000";
import Settings from "./components/settings/settings";
import Stats from "./components/stats/stats";
import CustomText from "./components/customText/customText";
import SelectText from "./components/customText/selectText";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  // const jwt = useSelector((state) => state.JWTreducer);
  const fontFamily = useSelector((state) => state.fontFamilyReducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`./components/themes/${colors}`);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const headers = {
  //       Authorization: jwt,
  //     };

  //     axios
  //       .get("https://protypist.herokuapp.com/users/me/settings", {
  //         headers: headers,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         dispatch({
  //           type: "SELECT_THEME",
  //           payload: response.data.theme,
  //         });
  //       })
  //       .then((e) => {
  //         console.log(e);
  //       });
  //   }
  // }, [jwt]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const data = {
  //       theme: colors,
  //       language: testLanguage,
  //       testLenghtAdvanced: lenghtAdvanced,
  //       testLenght: length,
  //       onScreenKeyboard: keyboardOnScreen,
  //       fontFamily: fontFamily,
  //       realTimeWpm: realTimeWPM,
  //       instaDeathMode: instaDeath,
  //     };
  //     const headers = {
  //       Authorization: jwt,
  //     };

  //     axios
  //       .patch("https://protypist.herokuapp.com/users/me/settings", data, {
  //         headers: headers,
  //       })
  //       .then((response) => {})
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // }, [
  //   fontFamily,
  //   colors,
  //   length,
  //   lenghtAdvanced,
  //   realTimeWPM,
  //   keyboardOnScreen,
  //   instaDeath,
  //   testLanguage,
  // ]);

  return (
    <div
      style={{
        backgroundColor: colorFiles.backgroundColor,
        fontFamily: fontFamily,
        fontSize: "12px",
      }}
    >
      <div>
        <Switch>
          <Route exact path="/">
            <TypingTest />
          </Route>
          {/* <Route path="/10second">
            <Typing10second />
          </Route> */}
          <Route path="/200">
            <Common200 />
          </Route>
          <Route path="/1000">
            <Common1000 />
          </Route>
          <Route exact path="/custom">
            <CustomText />
          </Route>
          <Route exact path="/custom/text">
            <SelectText />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route render={() => <Redirect to="/" />} />{" "}
          {/*  Redirect if no match */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
