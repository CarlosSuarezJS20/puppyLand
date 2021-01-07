import React, { Component } from 'react';
import HeroWelcomeSection from '../HeroWelcomeSection/HeroWelcomeSection';
import MainNavbar from '../MainNavbar/MainNavbar';
import MainInfoSection from '../MainInfoSection/MainInfoSection';
import classes from './Home.css';
import HomeSearchBreedSection from '../containers/HomeSearchBreedSection/HomeSearchBreedSection';
import Spinner from '../UI/Loader/Loader';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

import DogsCarousel from '../DogsCarousel/DogsCarousel';

class Home extends Component {
	componentDidMount() {
		this.props.onFetchDogs();
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
				<Spinner remove={this.props.loading} />
				<header className={classes.homeContainer}>
					<MainNavbar />
					<HeroWelcomeSection />
				</header>
				<MainInfoSection />
				<HomeSearchBreedSection />
				<DogsCarousel data={dogs} />
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
