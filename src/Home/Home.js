import React, { Component } from 'react';
import MainNavbar from '../MainNavbar/MainNavbar';
import classes from './Home.css';

class Home extends Component {
	render() {
		return (
			<div className={classes.homeContainer}>
				<MainNavbar />
			</div>
		);
	}
}

export default Home;
