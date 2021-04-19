import React from "react";
import { css, Global } from "@emotion/react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Global
        styles={css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Raleway;
          }
        `}
      />
      <Router>
        <Switch>
          <Route />
        </Switch>
      </Router>
      <h1>HOLA!</h1>
    </div>
  );
}

export default App;
