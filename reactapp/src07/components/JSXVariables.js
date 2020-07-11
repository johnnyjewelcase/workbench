import React from "react";

const name = "Jared";
const thoughts = "is tight";

function dropVowels(str) {
  const vowels = "aeiouAEIOU";
  let newStr = "";
  for (var i = 0; i < str.length; i++) {
    if (vowels.indexOf(str.charAt(i)) === -1) {
      newStr += str.charAt(i);
    }
  }
  return newStr;
}

function JSXVariables() {
  return (
    <div className="main-container">
      <div className="container">
        <div className="jumbotron">
          <h1>Hi! My name is {name}.</h1>
          <h2>My name has {name.length} letters.</h2>
          <h2>I think React {thoughts}.</h2>
          <h2>My name without any vowels is {dropVowels(name)}.</h2>
        </div>
      </div>
    </div>
  );
}

export default JSXVariables;
