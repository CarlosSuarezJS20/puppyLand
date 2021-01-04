import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import styles from './Logo.module.css';

const logo = () => {
	return (
		<div className={styles.LogoHolderMain}>
			<div className={styles.logoContainer}>
				<FontAwesomeIcon icon={faPaw} className={styles.logoItem} />
			</div>
			<p className={styles.LogoTitle}>
				puppy<span>Land</span>
			</p>
		</div>
	);
};

export default logo;
