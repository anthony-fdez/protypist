import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//components
import SideMenu from "./components/SideMenu/SideMenu";
import TypingTest from "./components/TypingTest/TypingTest";
import Quotes from "./components/quotes/quotes";
import Typing10second from "./components/10second/10second";
import Home from "./components/Home/Home";
import Common200 from "./components/200/common200";
import Common1000 from "./components/1000/common1000";
import Settings from "./components/settings/settings";

import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.darkModeReducer);
  console.log(theme);

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
        <Route path="/quotes">
          <Quotes />
        </Route>
        <Route path="/200">
          <Common200 />
        </Route>
        <Route path="/1000">
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
