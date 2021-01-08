import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

const rightImgBtnHandler = (props) => {
	return (
		<div onClick={props.onClick}>
			<FontAwesomeIcon icon={faArrowCircleRight} className="Right-arrow" />
		</div>
	);
};

export default rightImgBtnHandler;
