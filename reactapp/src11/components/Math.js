// import React from "react";

function Math({ num1, num2, operator }) {
  let result;

  switch (operator) {
    case "+": {
      result = num1 + num2;
      break;
    }
    case "-": {
      result = num1 - num2;
      break;
    }
    case "*": {
      result = num1 * num2;
      break;
    }
    case "/": {
      result = num1 / num2;
      break;
    }
  }

  return result;
}

export default Math;
