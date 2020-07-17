import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import CardBody from "../CardBody";
import CardBtn from "../CardBtn";
import CardImg from "../CardImage";
import CardHeading from "../CardHeading";
import "./style.css";

function Card() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <CardHeading />
      <CardImg />
      <CardBody />
      {!user.image && (
        <i className="fa fa-spinner fa-spin" aria-hidden="true" />
      )}
      <CardBtn style={{ opacity: user.image ? 1 : 0 }} data-value="back" />
      <CardBtn style={{ opacity: user.image ? 1 : 0 }} data-value="next" />
    </div>
  );
}

export default Card;
