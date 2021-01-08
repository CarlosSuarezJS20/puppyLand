import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const nextImgBtnHandler = (props) => {
	return (
		<div onClick={props.onClick}>
			<FontAwesomeIcon icon={faArrowCircleRight} />
		</div>
	);
};

export default nextImgBtnHandler;
