import React from "react";

function CardBody(props) {
  return (
    <p className="h4 pt-3">
      GitHub:{" "}
      <a target="blank" href={props.profileUrl}>
        {props.profileUrl}
      </a>
    </p>
  );
}

export default CardBody;
