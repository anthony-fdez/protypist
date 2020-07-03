import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//components
import SideMenu from "./components/SideMenu/SideMenu";
import TypingTest from "./components/TypingTest/TypingTest";
import Quotes from "./components/quotes/quotes";
import Typing10second from "./components/10second/10second";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
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
      </Switch>
    </div>
  );
}

export default App;
