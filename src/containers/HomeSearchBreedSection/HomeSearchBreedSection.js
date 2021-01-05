import React, { Component } from 'react';
import styles from './HomeSearchBreedSection.module.css';
import puppiesPic from '../../Assets/Images/puppies.jpeg';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class HomeSearchBreedSection extends Component {
	componentDidMount() {
		this.props.onFetchDogs();
	}

	render() {
		return (
			<div className={styles.SectionHolder}>
				<article className={styles.SelectSection}>
					<h2>do you have a breed in mind?</h2>
					<select className={styles.SelectOption}>
						<option value="">No Breed Selected</option>
						<option>Labrador</option>
						<option>Doverman</option>
					</select>
				</article>
				<article className={styles.ResultSection}>
					<div className={styles.ImageHolder}>
						<img
							src={puppiesPic}
							alt="puppies-img"
							className={styles.PuppiesImage}
						/>
					</div>
					<div className={styles.resultInfo}></div>
				</article>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dogs: state.dogs,
		loading: state.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDogs: () => dispatch(actions.fetchDogsFromServer()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeSearchBreedSection);
