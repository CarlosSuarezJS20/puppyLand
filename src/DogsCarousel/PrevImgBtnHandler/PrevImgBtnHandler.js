import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

const prevImgBtnHandler = (props) => {
  return (
    <div onClick={props.onClick}>
      <FontAwesomeIcon icon={faArrowCircleLeft} className="Left-arrow" />
    </div>
  );
};

export default prevImgBtnHandler;
