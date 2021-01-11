import React, { Component } from 'react';
import styles from './FindDog.module.css';

import MainFooter from '../MainFooter/MainFooter';
import MainNavbar from '../MainNavbar/MainNavbar';
import SectionDivider from '../UI/SectionDivider/SectionDivider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

import {
	removeDublicates,
	filterBuilder,
} from '../HelperFunctions/HelperFunctions';

class FindADogSection extends Component {
	state = {
		dogFilter: '',
	};

	componentDidMount() {
		this.props.onFetchDogs();
	}

	render() {
		let breedForFilters;
		let temperamentFilter;

		if (this.props.dogs) {
			const initialDogsBreedForFilter = this.props.dogs.map(
				(dog) => dog.bred_for
			);
			const initialTemperamentFilter = this.props.dogs.map(
				(dog) => dog.temperament
			);

			const initialDogsBreedWithoutDuplicates = removeDublicates(
				initialDogsBreedForFilter
			);

			breedForFilters = filterBuilder(
				'breedForFilter',
				initialDogsBreedWithoutDuplicates
			);
			temperamentFilter = filterBuilder(
				'temperament',
				initialTemperamentFilter
			);

			// breedForFilters = initialDogsBreedWithoutDuplicates.map((eachFor) => {
			// 	if (!eachFor) {
			// 		// eslint-disable-next-line array-callback-return
			// 		return;
			// 	}
			// 	return (
			// 		<div className={styles.InputHolder}>
			// 			<input type="checkbox" name="breedFor" value={eachFor} />
			// 			<label>{eachFor}</label>
			// 		</div>
			// 	);
			// });
		}

		return (
			<React.Fragment>
				<MainNavbar />
				<header className={styles.FindADogFiltersSection}>
					<h2>find your perfect puppy</h2>
					<SectionDivider />
					<div className={styles.FidDogFiltersHolder}>
						<div className={styles.FilterBtn}>filters</div>
					</div>
					<form className={styles.FormHolder}>
						<header className={styles.FormHeader}>
							<FontAwesomeIcon
								icon={faTimes}
								className={styles.CloseFilterSectionBtn}
							/>
							<h2> filters </h2>
							<button className={styles.ClearSearch}>clear</button>
						</header>
						<div className={styles.OptionsSection}>
							<div className={styles.CategoriesHolder}>
								<h3>breed for</h3>
								<div className={styles.OptionsHolder}>{breedForFilters}</div>
							</div>
							<th className={styles.FilterDivider}></th>
							<div className={styles.CategoriesHolder}>
								<h3>temperament</h3>
								<div className={styles.OptionsHolder}>{temperamentFilter}</div>
							</div>
							<th className={styles.FilterDivider}></th>
							<div className={styles.OptionsHolder}>
								<h3>origin</h3>
							</div>
							<th className={styles.FilterDivider}></th>
							<div className={styles.OptionsHolder}>
								<h3>size</h3>
							</div>
							<th className={styles.FilterDivider}></th>
							<div className={styles.SearchBtnHolder}>
								<button className={styles.SearchBtn}>search</button>
							</div>
						</div>
					</form>
				</header>
				<MainFooter />
			</React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(FindADogSection);
