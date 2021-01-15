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
	transformHeight,
} from '../HelperFunctions/HelperFunctions';
import FinderDisplayDogs from './FinderDisplayDogs/FinderDisplayDogs';

class FindADogSection extends Component {
	state = {
		formIsOpen: false,
		advancedFilterRequested: false,
		filters: [
			{ id: '34', name: '34', isChecked: false },
			{ id: '36', name: '36', isChecked: false },
			{ id: '35', name: '35', isChecked: false },
		],
	};

	componentDidUpdate() {
		// Handles the Filters state property update:
		this.updateFiltersHandler();
	}

	updateFiltersHandler = () => {
		if (this.filtersForIntialState.length + 3 === this.state.filters.length) {
			return;
		} else {
			const copyState = [...this.state.filters];
			const newFilters = copyState.concat(this.filtersForIntialState);
			this.setState({ filters: newFilters });
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
		this.setState({ formIsOpen: false });
	};

	onChangeCheckboxHandler = (event, id) => {
		const copyOfFilters = this.state.filters;
		copyOfFilters.forEach((filter) => {
			if (filter.id === id) {
				filter.isChecked = event.target.checked;
			}
		});
		this.setState({ filters: copyOfFilters });
	};

	render() {
		let dogsData;
		let breedForFilters;
		let temperamentMainFilters;
		let temperamentAdvancedFilter;

		if (this.props.dogs) {
			dogsData = this.props.dogs.map((dog) => {
				return {
					bred_for: dog.bred_for,
					id: dog.id,
					image: dog.image,
					name: dog.name,
					temperament: dog.temperament,
					height: transformHeight(dog.height),
				};
			});

			const listHeight = dogsData
				.map((dog) => dog.height)
				.filter((height) => !isNaN(height))
				.sort();

			console.log(listHeight[53], listHeight[107]);

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

			// Sets state for Filters CheckBoxes:

			const filterBreedFor = dogsBreedWithoutDuplicates;

			// Converted this into a property to make it available across the entire class and be able to use it in componentDidMount
			this.filtersForIntialState = filterBreedFor
				.concat(
					mainTemperamentsFiltersNoDuplicates,
					advancedTemperamentFiltersNoDuplicates
				)
				.map((filter) => {
					return { id: filter, name: filter, isChecked: false };
				});

			//BUILDS RENDER ELEMENTS

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
								<div className={styles.OptionsHolder}>
									<div key="small">
										<input
											type="checkbox"
											name="34"
											value="34"
											onChange={(e) => {
												this.onChangeCheckboxHandler(e, '34');
											}}
										/>
										<label>Small</label>
									</div>
									<div key="Medium">
										<input
											type="checkbox"
											name="35"
											value="35"
											onChange={(e) => {
												this.onChangeCheckboxHandler(e, '35');
											}}
										/>
										<label>Medium</label>
									</div>
									<div key="Large">
										<input
											type="checkbox"
											name="36"
											value="36"
											onChange={(e) => {
												this.onChangeCheckboxHandler(e, '36');
											}}
										/>
										<label>Large</label>
									</div>
								</div>
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
					data={this.props.dogs}
					filters={this.state.filters}
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
