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
} from '../HelperFunctions/HelperFunctions';
import FinderDisplayDogs from './FinderDisplayDogs/FinderDisplayDogs';

class FindADogSection extends Component {
	state = {
		filteredDogs: [],
		formIsOpen: false,
		advancedFilterRequested: false,
		filters: [],
	};

	componentDidUpdate() {
		// Handles the Filters state property update:
		this.updateFiltersHandler();
	}

	updateFiltersHandler = () => {
		if (this.filtersForIntialState.length === this.state.filters.length) {
			return;
		} else {
			this.setState({ filters: this.filtersForIntialState });
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
		const filters = filtersDataModeler(this.state.filters);
		const dogsCharacteristicsData = dataFromServerModelerUponSearch(
			this.props.dogs
		);

		const ret = dogsCharacteristicsData.filter(
			(dog) =>
				dog.characteristics.filter((characteristic) =>
					filters.some((filter) => characteristic.startsWith(filter))
				).length > 0 && filters.some((filter) => dog.height.includes(filter))
		);

		console.log(ret);

		this.setState({ formIsOpen: false });
	};

	onChangeCheckboxHandler = (event) => {
		const copyOfFilters = this.state.filters;

		copyOfFilters.forEach((filter) => {
			let name;
			if (isNaN(filter.name)) {
				if (filter.name.endsWith('ing')) {
					name = filter.name.slice(0, filter.name.length - 3);
				} else {
					name = filter.name;
				}
			} else {
				name = filter.name.toString();
			}

			if (name === event.target.value) {
				filter.isChecked = event.target.checked;
			}
		});
		this.setState({ filters: copyOfFilters });
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
			this.filtersForIntialState = filterBreedFor
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
