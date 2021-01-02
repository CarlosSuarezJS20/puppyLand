import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import styles from './MainNavbar.module.css';

class MainNavbar extends Component {
	render() {
		return (
			<div className={styles.Navbar}>
				<Logo />
			</div>
		);
	}
}

export default MainNavbar;
