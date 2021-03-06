import React, { Component } from 'react';
import styles from './FindDog.module.css';

import MainFooter from '../MainFooter/MainFooter';
import MainNavbar from '../MainNavbar/MainNavbar';
import SectionDivider from '../UI/SectionDivider/SectionDivider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from '../UI/Loader/Loader';

import * as actions from '../store/actions/index';
import { connect } from 'react-redux';

import {
	removeDublicates,
	filterBuilder,
	dataFromServerModelerUponSearch,
	bredForFiltersArray,
	stringsToArraysTemperaments,
	checkBoxesValueHandler,
	manageFiltersChanges,
	filterDataResults,
	updatesUiCheckedBox,
	clearAllFilters,
} from '../HelperFunctions/HelperFunctions';

import FinderDisplayDogs from './FinderDisplayDogs/FinderDisplayDogs';

class FindADogSection extends Component {
	state = {
		results: [],
		formIsOpen: false,
		advancedFilterRequested: false,
		checkBoxes: [],
		filter: { breedFor: [], temperaments: [], size: [] },
		filtering: false,
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.onFetchDogs();
	}

	componentDidUpdate() {
		// Handles the Filters state property update:
		window.scrollTo(0, 0);
		this.updateFiltersHandler();
	}

	updateFiltersHandler = () => {
		if (this.checkBoxesForIntialState.length === this.state.checkBoxes.length) {
			return;
		} else {
			this.setState({ checkBoxes: this.checkBoxesForIntialState });
		}
	};

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
		const checkBoxesList = this.state.checkBoxes;
		const copyOfFilter = this.state.filter;
		const { breedFor, temperaments, size } = copyOfFilter;
		clearAllFilters(breedFor, temperaments, size);

		for (let checkBox of checkBoxesList) {
			if (checkBox.isChecked) {
				updatesUiCheckedBox(checkBox); //Updates the UI and removes ticks from checkboxes
				checkBox.isChecked = false;
			}
		}
		this.setState({ checkBoxes: checkBoxesList, filtering: false });
	};

	searchRequestHandler = () => {
		const filterCopy = this.state.filter;

		if (
			filterCopy.breedFor.length === 0 &&
			filterCopy.temperaments.length === 0 &&
			filterCopy.size.length === 0
		) {
			this.setState({ filtering: false, formIsOpen: false });
		} else {
			// REMODELS SERVERS DATA FOR FILTERING PURPOSES
			const dogsCharacteristicsData = dataFromServerModelerUponSearch(
				this.props.dogs
			);

			const resultsFromFilter = filterDataResults(
				filterCopy,
				dogsCharacteristicsData
			);

			this.setState({
				formIsOpen: false,
				results: [...resultsFromFilter],
				filtering: true,
			});
		}
		// Ensures that first page of pagination is selected
		document.getElementById('page-1').firstChild.click();
	};

	onChangeCheckboxHandler = (event) => {
		// HANDLES THE CHECK BOXES TRUE OR FALSE
		const copyOfCheckBoxes = this.state.checkBoxes;
		checkBoxesValueHandler(copyOfCheckBoxes, event);

		// MANAGES THE FILTER FOR THE STATE DEPENDING ON INPUT CHANGES
		const copyOfFilter = this.state.filter;
		const { breedFor, temperaments, size } = copyOfFilter;
		manageFiltersChanges(breedFor, temperaments, size, event);

		this.setState({
			checkBoxes: copyOfCheckBoxes,
			filter: { ...copyOfFilter },
		});
	};

	render() {
		let breedForFilters;
		let temperamentMainFilters;
		let temperamentAdvancedFilter;
		let heightFilters;
		let filteredDogData = this.props.dogs.filter((dog) => {
			return this.state.results.includes(dog.id);
		});

		if (this.props.dogs) {
			// BREED_FOR FILTERS

			this.props.dogs.filter((dog) => dog);

			const initialDogsBreedForFilter = bredForFiltersArray(this.props.dogs);

			const dogsBreedWithoutDuplicates = removeDublicates(
				initialDogsBreedForFilter
			);

			// filters data before allocating it to elements TEMPERAMENT

			const initialTemperamentFilter = stringsToArraysTemperaments(
				this.props.dogs
			);

			// SPLITS MAIN AND ADVANCED FILTERS IN TEMPERAMENT and Removes irrelevant filters

			const advancedTemperamentFilters = initialTemperamentFilter.filter(
				(word) =>
					word !== 'stubborn' &&
					word !== 'small' &&
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

			//REMOVES DUPLICATES FROM MAIN FILTERS LIST

			const mainTemperamentsFiltersNoDuplicates = removeDublicates(
				mainTemperamentsFilters
			);

			//REMOVES DUPLICATES FROM ADVANCED FILTERs LIST

			const advancedTemperamentFiltersNoDuplicates = removeDublicates(
				advancedTemperamentFilters
			);

			//BUILDS RENDER ELEMENTS FOR FILTERS WITH A HELPER FUNCTION

			breedForFilters = filterBuilder(
				'breedForFilter',
				dogsBreedWithoutDuplicates,
				this.onChangeCheckboxHandler
			);

			temperamentMainFilters = filterBuilder(
				'temperament',
				mainTemperamentsFiltersNoDuplicates,
				this.onChangeCheckboxHandler
			);

			temperamentAdvancedFilter = filterBuilder(
				'temperament',
				advancedTemperamentFiltersNoDuplicates,
				this.onChangeCheckboxHandler
			);

			heightFilters = filterBuilder(
				'height',
				['small', 'medium', 'large'],
				this.onChangeCheckboxHandler
			);

			// Sets state for Filters CheckBoxes:

			const filterBreedFor = dogsBreedWithoutDuplicates;

			// Converted this into a property to make it available across the entire class and be able to use it in componentDidMount
			this.checkBoxesForIntialState = filterBreedFor
				.concat(
					mainTemperamentsFiltersNoDuplicates,
					advancedTemperamentFiltersNoDuplicates,
					['small', 'medium', 'large']
				)
				.map((filter) => {
					return { name: filter, isChecked: false };
				});
		}

		// Update Data for Displaying Dogs
		if (this.state.results.length >= 0) {
		}

		// CLASSES

		let formClass = [styles.FormHolder];
		if (this.state.formIsOpen) {
			formClass = [styles.FormHolder, styles.ShowForm];
		}

		let advancedFilterClass = [styles.OptionsHolderAdvanced];

		if (this.state.advancedFilterRequested) {
			advancedFilterClass = [styles.OptionsHolderAdvanced, styles.Show];
		}

		return (
			<React.Fragment>
				<Loader />
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
								<div className={styles.OptionsHolder}>{heightFilters}</div>
							</div>
							<div className={styles.SearchBtnHolder}>
								<button
									className={styles.SearchBtn}
									onClick={(event) => {
										event.preventDefault();
										this.searchRequestHandler();
										this.setState({ advancedFilterRequested: false });
									}}
								>
									search
								</button>
							</div>
						</div>
					</form>
				</header>
				<FinderDisplayDogs
					data={this.state.filtering ? filteredDogData : this.props.dogs}
				/>

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
