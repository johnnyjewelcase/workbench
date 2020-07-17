import React from "react";
import CardBody from "../CardBody";
import CardBtn from "../CardBtn";
import CardImg from "../CardImage";
import CardHeading from "../CardHeading";
import "./style.css";

function Card(props) {
  /* 
    Add props to the components below as explained in the README for this activity.
  */
  return (
    <div>
      <CardHeading title={props.title} />
      <CardImg image={props.image} />
      <CardBody profileUrl={props.profileUrl} />
      {!props.image && (
        <i className="fa fa-spinner fa-spin" aria-hidden="true" />
      )}
      <CardBtn
        handleClick={props.handleClick}
        style={{ opacity: props.image ? 1 : 0 }}
        data-value="back"
      />
      <CardBtn
        handleClick={props.handleClick}
        style={{ opacity: props.image ? 1 : 0 }}
        data-value="next"
      />
    </div>
  );
}

export default Card;
