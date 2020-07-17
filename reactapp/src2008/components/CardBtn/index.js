import React from "react";
import "./style.css";

function CardBtn(props) {
  return (
    <button
      onClick={props.handleClick}
      className={`card-btn ${props["data-value"]}`}
      {...props}
    />
  );
}

export default CardBtn;
