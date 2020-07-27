import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

//components
import TypingTest from "./components/TypingTest/TypingTest";
import WPMcalculator from "./components/WPM_calculator/WPMcalculator";
import Typing10second from "./components/10second/10second";
import Home from "./components/Home/Home";
import Common200 from "./components/200/common200";
import Common1000 from "./components/1000/common1000";
import Settings from "./components/settings/settings";

import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.darkModeReducer);

  return (
    <div
      style={
        theme
          ? { backgroundColor: "rgb(40,40,40)" }
          : { backgroundColor: "rgb(255,255,255)" }
      }
    >
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/10second">
          <Typing10second />
        </Route>
        <Route path="/typingtest">
          <TypingTest />
        </Route>
        <Route path="/WPMcalculator">
          <WPMcalculator />
        </Route>
        <Route path="/typingtest/200">
          <Common200 />
        </Route>
        <Route path="/typingtest/1000">
          <Common1000 />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
