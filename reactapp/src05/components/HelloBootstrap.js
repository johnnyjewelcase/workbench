import React from "react";
import navbar from "./navbar";
import jumbotron from "./jumbotron";
import card from "./card";

function HelloBootstrap() {
  return (
    <div className="container">
      <navbar />
      <jumbotron />
      <card />
    </div>
  );
}

export default HelloBootstrap;
