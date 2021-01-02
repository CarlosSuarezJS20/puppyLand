import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import classes from './Logo.css';

const logo = () => {
	return (
		<div className={classes.logoContainer}>
			<FontAwesomeIcon icon={faPaw} className={classes.logoItem} />
		</div>
	);
};

export default logo;
