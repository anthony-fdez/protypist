import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

//components
import TypingTest from "./components/TypingTest/TypingTest";
import Typing10second from "./components/10second/10second";
import Common200 from "./components/200/common200";
import Common1000 from "./components/1000/common1000";
import Settings from "./components/settings/settings";
import Stats from "./components/stats/stats";

import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.darkModeReducer);
  const colors = useSelector((state) => state.themeReducer);
  const colorFiles = require(`./components/themes/${colors}`);
  const fontFamily = useSelector((state) => state.fontFamilyReducer);

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
