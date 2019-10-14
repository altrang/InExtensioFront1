import React from "react";
import ReactDOM from "react-dom";

import MainContainer from "./MainContainer";

function App() {
  return (
    <div style={{ width: "30%" }}>
      <h1>Hello InExtensoDigital</h1>
      <MainContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
