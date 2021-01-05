import React, { Component } from 'react';
import HeroWelcomeSection from '../HeroWelcomeSection/HeroWelcomeSection';
import MainNavbar from '../MainNavbar/MainNavbar';
import MainInfoSection from '../MainInfoSection/MainInfoSection';
import classes from './Home.css';
import HomeSearchBreedSection from '../containers/HomeSearchBreedSection/HomeSearchBreedSection';

class Home extends Component {
	render() {
		return (
			<header className={classes.homeContainer}>
				<MainNavbar />
				<HeroWelcomeSection />
				<MainInfoSection />
				<HomeSearchBreedSection />
			</header>
		);
	}
}

export default Home;
