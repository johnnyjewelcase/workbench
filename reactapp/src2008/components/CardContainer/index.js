import React from "react";
import Card from "../Card";
import "./style.css";

function CardContainer(props) {
  return (
    <div className="jumbotron card-container">
      <Card
        title={props.title}
        image={props.image}
        profileUrl={props.profileUrl}
        handleClick={props.handleClick}
      />
    </div>
  );
}

export default CardContainer;
