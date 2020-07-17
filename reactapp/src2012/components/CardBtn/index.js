import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import "./style.css";

function CardBtn(props) {
  const { onClick } = useContext(UserContext);

  return (
    <button
      onClick={onClick}
      className={`card-btn ${props["data-value"]}`}
      {...props}
    />
  );
}

export default CardBtn;
