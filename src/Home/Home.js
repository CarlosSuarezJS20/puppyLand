import React, { Component } from 'react';
import HeroWelcomeSection from '../HeroWelcomeSection/HeroWelcomeSection';
import MainNavbar from '../MainNavbar/MainNavbar';
import MainInfoSection from '../MainInfoSection/MainInfoSection';
import classes from './Home.css';
import HomeSearchBreedSection from '../containers/HomeSearchBreedSection/HomeSearchBreedSection';
import Spinner from '../UI/Loader/Loader';

import { connect } from 'react-redux';

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<Spinner remove={this.props.loading} />
				<header className={classes.homeContainer}>
					<MainNavbar />
					<HeroWelcomeSection />
				</header>
				<MainInfoSection />
				<HomeSearchBreedSection />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dogs: state.dogs,
		dog: state.oneDog,
		loading: state.loading,
	};
};

export default connect(mapStateToProps, null)(Home);
