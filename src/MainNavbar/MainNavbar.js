import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import styles from './MainNavbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import NavigationItems from '../NavigationItems/NavigationItems';

class MainNavbar extends Component {
	state = {
		showTopBar: false,
	};

	showTopBarHandler = () => {
		this.setState({ showTopBar: true });
	};

	hideTopBarHandler = () => {
		this.setState({ showTopBar: false });
	};

	render() {
		return (
			<div className={styles.Navbar}>
				<div className={styles.LogoHolder}>
					<Logo />
				</div>
				<FontAwesomeIcon
					icon={faEllipsisV}
					className={styles.DotsMenu}
					onClick={this.showTopBarHandler}
				/>

				<NavigationItems
					open={this.state.showTopBar}
					clicked={this.hideTopBarHandler}
				/>
			</div>
		);
	}
}

export default MainNavbar;
