import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const nextImgBtnHandler = (props) => {
	return (
		<div onClick={props.onClick}>
			<FontAwesomeIcon icon={faArrowCircleLeft} />
		</div>
	);
};

export default nextImgBtnHandler;
