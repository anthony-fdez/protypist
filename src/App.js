import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import "./components/TypingTest/TypingTest.css";

import { useSelector } from "react-redux";

const Typing10second = lazy(() => import("./components/10second/10second"));
const TypingTest = lazy(() => import("./components/TypingTest/TypingTest"));
const Common200 = lazy(() => import("./components/200/common200"));
const Common1000 = lazy(() => import("./components/1000/common1000"));
const Settings = lazy(() => import("./components/settings/settings"));
const Stats = lazy(() => import("./components/stats/stats"));
const CustomText = lazy(() => import("./components/customText/customText"));
const SelectText = lazy(() => import("./components/customText/selectText"));

function App() {
  // const isLoggedIn = useSelector((state) => state.isLoggedInReducer);
  // const jwt = useSelector((state) => state.JWTreducer);
  const fontFamily = useSelector((state) => state.fontFamilyReducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`./components/themes/${colors}`);
  const fontSize = useSelector((state) => state.fontSizeReducer);

  const loadingFallbackComponent = () => {
    return (
      <div className="loading-fallback-component-div">
        <div>
          <div
            style={{ backgroundColor: colorFiles.secondaryBackgroundColor }}
            className="loading-fallback-fake-header"
          >
            <div className="fake-loading-spinner">
              <div style={{ margin: 0 }} className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
              </div>
            </div>
          </div>
        </div>
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
        <Suspense fallback={loadingFallbackComponent()}>
          <Switch>
            <Route exact path="/">
              <TypingTest />
            </Route>
            <Route path="/10seconds">
              <Typing10second />
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
        </Suspense>
      </div>
    </div>
  );
}

export default App;
