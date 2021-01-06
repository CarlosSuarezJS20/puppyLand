import React, { Component } from 'react';
import styles from './HomeSearchBreedSection.module.css';
import puppiesPic from '../../Assets/Images/puppies.jpeg';

import Spinner from '../../UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class HomeSearchBreedSection extends Component {
	componentDidMount() {
		this.props.onFetchDogs();
	}

	// DEAL WITH ERRORS!
	selectOnChangeHandler = (event) => {
		if (event.target.value === 'no breed selected') {
			return;
		} else {
			const { id } = this.props.dogs.find(
				(dog) => dog.name === event.target.value
			);
			this.props.onFetchOneDog(id);
		}
	};

	render() {
		let dogs;
		let filterImg = (
			<img src={puppiesPic} alt="puppies-img" className={styles.PuppiesImage} />
		);

		if (this.props.dogs) {
			dogs = this.props.dogs.map((dog) => (
				<option key={dog.name}>{dog.name}</option>
			));
		}

		if (this.props.loadingADog) {
			filterImg = <Spinner section="searchDog" />;
		}

		if (this.props.dog.length > 0) {
			const [breed] = this.props.dog;
			filterImg = (
				<img
					src={breed.url}
					alt="puppies-img"
					className={styles.PuppiesImage}
				/>
			);
		}

		return (
			<section className={styles.SectionHolder}>
				<article className={styles.SelectSection}>
					<h2>do you have a breed in mind?</h2>
					<select
						className={styles.SelectOption}
						onChange={(event) => {
							this.selectOnChangeHandler(event);
						}}
					>
						<option>no breed selected</option>
						{dogs}
					</select>
				</article>
				<article className={styles.ResultSection}>
					<div className={styles.ImageHolder}>{filterImg}</div>
					<div className={styles.resultInfo}></div>
					{/* need to work on this */}
				</article>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dogs: state.dogs,
		dog: state.oneDog,
		loadingADog: state.loadingDog,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDogs: () => dispatch(actions.fetchDogsFromServer()),
		onFetchOneDog: (id) => dispatch(actions.fetchOneDogFromServer(id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeSearchBreedSection);
