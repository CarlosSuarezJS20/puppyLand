import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import styles from './navigationItems.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

const navigationItems = () => {
	return (
		<ul className={styles.logoContainer}>
			<NavigationItem>Home</NavigationItem>
			<NavigationItem>Find a Puppy</NavigationItem>

			<NavigationItem>
				<FontAwesomeIcon icon={faUserAlt} />
			</NavigationItem>
		</ul>
	);
};

export default navigationItems;
