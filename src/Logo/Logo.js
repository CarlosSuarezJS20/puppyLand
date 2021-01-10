import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import styles from './Logo.module.css';

const logo = (props) => {
	if (props.logoClass) {
	}

	return (
		<div className={styles.LogoHolderMain}>
			<div className={styles.LogoContainer}>
				<FontAwesomeIcon icon={faPaw} className={styles.LogoItem} />
			</div>
			<p className={styles.LogoTitle}>
				puppy<span>Finder</span>
			</p>
		</div>
	);
};

export default logo;
