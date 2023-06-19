import React from "react";
import ReactDOM from "react-dom/client";
import Container from "./component/Container";
import "./index.css";

function Header(props) {
  return (
    <h1>TO-DO LIST</h1>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Header title="TO-DO LIST"/>
    <Container/>
  </div>
);
