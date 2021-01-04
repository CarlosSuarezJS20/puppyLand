import React, { Component } from 'react';
import HeroWelcomeSection from '../HeroWelcomeSection/HeroWelcomeSection';
import MainNavbar from '../MainNavbar/MainNavbar';
import WhySection from '../WhySection/WhySection';
import classes from './Home.css';

class Home extends Component {
	render() {
		return (
			<header className={classes.homeContainer}>
				<MainNavbar />
				<HeroWelcomeSection />
				<WhySection />
			</header>
		);
	}
}

export default Home;
