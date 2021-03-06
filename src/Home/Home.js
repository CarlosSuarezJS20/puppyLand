import React, { Component } from 'react';
import HeroWelcomeSection from '../HeroWelcomeSection/HeroWelcomeSection';
import MainNavbar from '../MainNavbar/MainNavbar';
import MainInfoSection from '../MainInfoSection/MainInfoSection';
import classes from './Home.css';
import HomeSearchBreedSection from '../containers/HomeSearchBreedSection/HomeSearchBreedSection';
import Loader from '../UI/Loader/Loader';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

import DogsCarousel from '../DogsCarousel/DogsCarousel';
import MainFooter from '../MainFooter/MainFooter';

class Home extends Component {
	componentDidMount() {
		this.props.onFetchDogs();
		window.scrollTo(0, 0);
	}

	render() {
		let dogs;

		if (this.props.dogs) {
			dogs = this.props.dogs
				.map((dog) => dog.image)
				.map((image) => ({ image: image.url, id: image.id }));
		}

		return (
			<React.Fragment>
				<Loader />
				<header className={classes.homeContainer}>
					<MainNavbar />
					<HeroWelcomeSection />
				</header>
				<MainInfoSection />
				<HomeSearchBreedSection />
				<DogsCarousel data={dogs} />
				<MainFooter />
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

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDogs: () => dispatch(actions.fetchDogsFromServer()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
