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
	filtersDataModeler,
	dataFromServerModelerUponSearch,
	bredForFiltersArray,
	stringsToArraysTemperaments,
	checkBoxesStateCreator,
	manageFiltersChanges,
	filterDataResults,
} from '../HelperFunctions/HelperFunctions';

import FinderDisplayDogs from './FinderDisplayDogs/FinderDisplayDogs';

class FindADogSection extends Component {
	state = {
		results: [],
		formIsOpen: false,
		advancedFilterRequested: false,
		checkBoxes: [],
		filter: { breedFor: [], temperaments: [], size: [] },
	};

	componentDidUpdate() {
		// Handles the Filters state property update:
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
		console.log('click');
	};

	searchRequestHandler = () => {
		const filterCopy = this.state.filter;
		const copyOfResults = this.state.results;
		const dogsCharacteristicsData = dataFromServerModelerUponSearch(
			this.props.dogs
		);

		const filters = filterDataResults(filterCopy, dogsCharacteristicsData);
		console.log(filters);

		this.setState({ formIsOpen: false });
	};

	onChangeCheckboxHandler = (event) => {
		// Creates the checkboxes for the State
		const copyOfCheckBoxes = this.state.checkBoxes;
		checkBoxesStateCreator(copyOfCheckBoxes, event);

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

		if (this.props.dogs) {
			// BREED_FOR FILTERS

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
				<FinderDisplayDogs data={this.props.dogs} />
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

// const data = [
// 	{
// 		id: 1,
// 		bredFor: ['hunting'],
// 		temperaments: [
// 			'stubborn',
// 			'curious,',
// 			'playful,',
// 			'adventurous,',
// 			'active,',
// 			'fun-loving',
// 		],
// 		size: 'small',
// 	},
// 	{
// 		id: 2,
// 		bredFor: ['coursing', 'hunting'],
// 		temperaments: ['aloof', 'clownish,', 'dignified,', 'independent,', 'happy'],
// 		size: 'large',
// 	},
// 	{
// 		id: 3,
// 		bredFor: [],
// 		temperaments: ['wild', 'hardworking,', 'dutiful'],
// 		size: 'large',
// 	},
// 	{
// 		id: 4,
// 		bredFor: ['hunting'],
// 		temperaments: [
// 			'outgoing',
// 			'friendly,',
// 			'alert,',
// 			'confident,',
// 			'intelligent,',
// 			'courageous',
// 		],
// 		size: 'medium',
// 	},
// 	{
// 		id: 5,
// 		bredFor: ['guarding'],
// 		temperaments: ['loyal', 'independent,', 'intelligent,', 'brave'],
// 		size: 'large',
// 	},
// 	{
// 		id: 6,
// 		bredFor: ['hunting'],
// 		temperaments: [
// 			'docile',
// 			'alert,',
// 			'responsive,',
// 			'dignified,',
// 			'composed,',
// 			'friendly,',
// 			'receptive,',
// 			'faithful,',
// 			'courageous',
// 		],
// 		size: 'large',
// 	},
// 	{
// 		id: 7,
// 		bredFor: ['guarding'],
// 		temperaments: [
// 			'loving',
// 			'protective,',
// 			'trainable,',
// 			'dutiful,',
// 			'responsible',
// 		],
// 		size: 'medium',
// 	},
// 	{
// 		id: 8,
// 		bredFor: ['hauling', 'pulling'],
// 		temperaments: [
// 			'friendly',
// 			'affectionate,',
// 			'devoted,',
// 			'loyal,',
// 			'dignified,',
// 			'playful',
// 		],
// 		size: 'large',
// 	},
// 	{
// 		id: 9,
// 		bredFor: [],
// 		temperaments: [
// 			'friendly',
// 			'affectionate,',
// 			'devoted,',
// 			'loyal,',
// 			'dignified,',
// 			'playful',
// 		],
// 		size: 'large',
// 	},
// 	{
// 		id: 11,
// 		bredFor: [],
// 		temperaments: [
// 			'strong',
// 			'willed',
// 			'stubborn,',
// 			'friendly,',
// 			'clownish,',
// 			'affectionate,',
// 			'loyal,',
// 			'obedient,',
// 			'intelligent,',
// 			'courageous',
// 		],
// 		size: 'small',
// 	},
// 	{
// 		id: 12,
// 		bredFor: [],
// 		temperaments: [
// 			'friendly',
// 			'alert,',
// 			'reserved,',
// 			'intelligent,',
// 			'protective',
// 		],
// 		size: 'medium',
// 	},
// 	{
// 		id: 13,
// 		bredFor: [],
// 		temperaments: [
// 			'friendly',
// 			'alert,',
// 			'reserved,',
// 			'intelligent,',
// 			'protective',
// 		],
// 		size: 'small',
// 	},
// 	{
// 		id: 14,
// 		bredFor: ['hunting'],
// 		temperaments: [
// 			'kind',
// 			'sweet-tempered,',
// 			'loyal,',
// 			'independent,',
// 			'intelligent,',
// 			'loving',
// 		],
// 		size: 'large',
// 	},
// 	{
// 		id: 15,
// 		bredFor: ['fighting'],
// 		temperaments: [
// 			'strong',
// 			'willed',
// 			'stubborn,',
// 			'friendly,',
// 			'clownish,',
// 			'affectionate,',
// 			'loyal,',
// 			'obedient,',
// 			'intelligent,',
// 			'courageous',
// 		],
// 		size: 'medium',
// 	},
// 	{
// 		id: 17,
// 		bredFor: ['flushing', 'retrieving'],
// 		temperaments: [
// 			'friendly',
// 			'energetic,',
// 			'obedient,',
// 			'intelligent,',
// 			'protective,',
// 			'trainable',
// 		],
// 		size: 'medium',
// 	},
// ];
