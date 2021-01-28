import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';
import Logo from '../Logo/Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const navigationItems = (props) => {
	let containerClasses = [styles.LinksContainer];

	if (props.open) {
		containerClasses = [styles.LinksContainer, styles.ShowLinksContainer];
	}

	return (
		<ul className={containerClasses.join(' ')}>
			<div className={styles.LogoAndCloseMenu}>
				<Logo />
				<FontAwesomeIcon
					icon={faTimes}
					className={styles.CloseMenu}
					onClick={props.clicked}
				/>
			</div>
			<NavigationItem link="/" exact>
				home
			</NavigationItem>
			<NavigationItem link="/find-dog">find a puppy</NavigationItem>
		</ul>
	);
};

export default navigationItems;
