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
		formIsOpen: false,
		advancedFilterRequested: false,
	};

	componentDidMount() {
		this.props.onFetchDogs();
	}

	openFormHandler = () => {
		this.setState({ formIsOpen: true });
	};

	closeFormHandler = () => {
		this.setState({ formIsOpen: false });
	};

	openandCloseAdvancedSearch = () => {
		if (this.state.advancedFilterRequested) {
			this.setState({ advancedFilterRequested: false });
		} else {
			this.setState({ advancedFilterRequested: true });
		}
	};

	closeAdvancedSearch = () => {
		this.setState({ advancedFilterRequested: false });
	};

	clearFiltersHandler = () => {
		console.log('click');
	};

	searchRequestHandler = () => {
		this.setState({ formIsOpen: false });
	};

	render() {
		let breedForFilters;
		let temperamentMainFilters;
		let temperamentAdvancedFilter;

		if (this.props.dogs) {
			//filters data before allocating it to elements BREED FOR
			const initialDogsBreedForFilter = this.props.dogs
				.map((dog) => dog.bred_for)
				.join(' , ')
				.split(' ')
				.filter((word) => {
					return word.endsWith('ing');
				})
				.map((word) => word.toLowerCase())
				.filter((word) => word !== 'driving')
				.sort();

			const dogsBreedWithoutDuplicates = removeDublicates(
				initialDogsBreedForFilter
			);

			// filters data before allocating it to elements TEMPERAMENT

			const initialTemperamentFilter = this.props.dogs
				.map((dog) => dog.temperament)
				.join(' , ')
				.split(' ')
				.filter((word) => word.length > 3)
				.map((word) => word.replace(',', '').toLowerCase())
				.sort();

			// SPLITS MAIN AND ADVANCED FILTERS IN TEMPERAMENT

			const advancedTemperamentFilters = initialTemperamentFilter.filter(
				(word) =>
					word !== 'stubborn' &&
					word !== 'playful' &&
					word !== 'active' &&
					word !== 'friendly' &&
					word !== 'intelligent' &&
					word !== 'gentle' &&
					word !== 'gay'
			);

			const mainTemperamentsFilters = initialTemperamentFilter.filter(
				(word) =>
					word === 'stubborn' ||
					word === 'playful' ||
					word === 'active' ||
					word === 'friendly' ||
					word === 'intelligent' ||
					word === 'gentle'
			);

			//REMOVES DUPLICATES FROM MAIN LIST

			const mainTemperamentsFiltersNoDuplicates = removeDublicates(
				mainTemperamentsFilters
			);

			const advancedTemperamentFiltersNoDuplicates = removeDublicates(
				advancedTemperamentFilters
			);

			//BUILDS RENDER ELEMENTS

			breedForFilters = filterBuilder(
				'breedForFilter',
				dogsBreedWithoutDuplicates
			);

			temperamentMainFilters = filterBuilder(
				'temperament',
				mainTemperamentsFiltersNoDuplicates
			);

			temperamentAdvancedFilter = filterBuilder(
				'temperament',
				advancedTemperamentFiltersNoDuplicates
			);
		}

		// CLASSES

		let formClass = [styles.FormHolder];
		if (this.state.formIsOpen) {
			formClass = [styles.FormHolder, styles.ShowForm];
			console.log(formClass.join(' '));
		}

		let advancedFilterClass = [styles.OptionsHolderAdvanced];

		if (this.state.advancedFilterRequested) {
			advancedFilterClass = [styles.OptionsHolderAdvanced, styles.Show];
		}
		return (
			<React.Fragment>
				<MainNavbar />
				<header className={styles.FindADogFiltersSection}>
					<h2>find your perfect puppy</h2>
					<SectionDivider />
					<div className={styles.FidDogFiltersHolder}>
						<div className={styles.FilterBtn} onClick={this.openFormHandler}>
							filters
						</div>
					</div>
					<form className={formClass.join(' ')}>
						<header className={styles.FormHeader}>
							<FontAwesomeIcon
								icon={faTimes}
								className={styles.CloseFilterSectionBtn}
								onClick={this.closeFormHandler}
							/>
							<h2> filters </h2>
							<button
								className={styles.ClearSearch}
								onClick={(event) => {
									event.preventDefault();
									this.clearFiltersHandler();
								}}
							>
								clear
							</button>
						</header>
						<div className={styles.OptionsSection}>
							<div className={styles.CategoriesHolder}>
								<h3>breed for</h3>
								<div className={styles.OptionsHolder}>{breedForFilters}</div>
							</div>

							<div className={styles.CategoriesHolder}>
								<h3>temperament</h3>
								<div className={styles.OptionsHolder}>
									{temperamentMainFilters}
								</div>
								<div className={styles.AdvanceFiltersBtnHolder}>
									<button
										onClick={(event) => {
											event.preventDefault();
											this.openandCloseAdvancedSearch();
										}}
									>
										advanced
									</button>
								</div>
								<div className={advancedFilterClass.join(' ')}>
									{temperamentAdvancedFilter}
								</div>
							</div>
							<div className={styles.CategoriesHolder}>
								<h3>Size</h3>
								<div className={styles.OptionsHolder}>
									<div key="small">
										<input type="checkbox" name="breedFor" value="35" />
										<label>Small</label>
									</div>
									<div key="big">
										<input type="checkbox" name="breedFor" value="36" />
										<label>Big</label>
									</div>
								</div>
							</div>
							<div className={styles.SearchBtnHolder}>
								<button
									className={styles.SearchBtn}
									onClick={(event) => {
										event.preventDefault();
										this.searchRequestHandler();
									}}
								>
									search
								</button>
							</div>
						</div>
					</form>
				</header>
				<div className={styles.Dogs}>Dog</div>
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
