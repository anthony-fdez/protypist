import React, { lazy, Suspense, useEffect } from "react";
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
import { useSelector } from "react-redux";

const Typing10second = lazy(() => import("./components/10second/10second"));

function App() {
  // const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  // const jwt = useSelector((state) => state.JWTreducer);
  const fontFamily = useSelector((state) => state.fontFamilyReducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`./components/themes/${colors}`);
  const fontSize = useSelector((state) => state.fontSizeReducer);

  const loadingFallbackComponent = () => {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: colorFiles.backgroundColor,
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div>
        <Switch>
          <Route exact path="/">
            <TypingTest />
          </Route>
          <Route path="/10seconds">
            <Suspense fallback={loadingFallbackComponent()}>
              <Typing10second />
            </Suspense>
          </Route>
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
