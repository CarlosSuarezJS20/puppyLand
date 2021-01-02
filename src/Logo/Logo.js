import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import styles from './Logo.module.css';

const logo = () => {
	return (
		<div className={styles.logoContainer}>
			<FontAwesomeIcon icon={faPaw} className={styles.logoItem} />
		</div>
	);
};

export default logo;
