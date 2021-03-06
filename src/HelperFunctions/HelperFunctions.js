/* eslint-disable array-callback-return */
/* eslint-disable default-case */
import React from 'react';

// DATA FROM SERVER MANIPULATION FOR FILTERS

const transformHeight = (heightObj) => {
	const { metric } = heightObj;
	const metricArray = metric.split('-').map((n) => +n);
	let size;
	if (
		(metricArray[0] + metricArray[1]) / 2 > 39.5 &&
		(metricArray[0] + metricArray[1]) / 2 < 59
	) {
		// defines the size of the dogs according to averages
		size = 'medium';
	} else if ((metricArray[0] + metricArray[1]) / 2 <= 39.5) {
		size = 'small';
	} else {
		size = 'large';
	}

	return size;
};

// reorganise original data upon filtering

export const dataFromServerModelerUponSearch = (data) => {
	return data
		.map((dog) => {
			if (!dog.bred_for || !dog.temperament || !dog.height) {
				return;
			} else {
				return {
					id: dog.id,
					bredFor: dog.bred_for
						.replace(',', '')
						.split(' ')
						.map((word) => word.replace(',', '').toLowerCase())
						.filter((word) => !(word.length < 2) && word.endsWith('ing')),
					temperaments: dog.temperament
						.replace(',', '')
						.split(' ')
						.map((word) => word.replace(',', '').toLowerCase())
						.filter(
							(word) =>
								!(word.length <= 2) && word !== 'and' && word !== 'small'
						),
					size: transformHeight(dog.height),
				};
			}
		})
		.filter((dog) => dog);
};

// Data re-structuring

// REMOVES DUPLICATES FROM FILTERS

export const removeDublicates = (array) => {
	return array.filter((each, index) => {
		return array.indexOf(each) === index;
	});
};

// Data Strings into Arrays for Bred For
export const bredForFiltersArray = (data) => {
	return data
		.map((dog) => dog.bred_for)
		.join(' , ')
		.split(' ')
		.filter((word) => {
			return word.endsWith('ing');
		})
		.map((word) => word.toLowerCase())
		.filter((word) => word !== 'driving')
		.sort();
};

// Data Strings to Arrays for Temperaments

export const stringsToArraysTemperaments = (data) => {
	return data
		.map((dog) => dog.temperament)
		.join(' , ')
		.split(' ')
		.filter((word) => word.length > 3)
		.map((word) => word.replace(',', '').toLowerCase())
		.sort();
};

// checkBoxes State property creator function

export const checkBoxesValueHandler = (array, event) => {
	return array.forEach((filter) => {
		if (filter.name === event.target.value) {
			filter.isChecked = event.target.checked;
		}
	});
};

// MANAGES THE FILTER FOR THE STATE DEPENDING ON INPUT CHANGES

export const manageFiltersChanges = (bredFor, temp, size, event) => {
	if (event.target.name === 'breedFor') {
		if (bredFor.includes(event.target.value)) {
			// removes it if the checkedbox already exist
			const featureIndex = bredFor.findIndex(
				(feature) => feature === event.target.value
			);
			bredFor.splice(featureIndex, 1);
		} else {
			bredFor.push(event.target.value);
		}
	}

	if (event.target.name === 'temperament') {
		if (temp.includes(event.target.value)) {
			const featureIndex = temp.findIndex(
				(feature) => feature === event.target.value
			);
			temp.splice(featureIndex, 1);
		} else {
			temp.push(event.target.value);
		}
	}

	if (event.target.name === 'size') {
		if (size.includes(event.target.value)) {
			const featureIndex = size.findIndex(
				(size) => size === event.target.value
			);
			size.splice(featureIndex, 1);
		} else {
			size.push(event.target.value);
		}
	}
};

//REMOVES ALL FILTERS FROM THE FILTER PROPERTY IN THE STATE:

// FILTER FUNCTION:

export const clearAllFilters = (breedFor, temperaments, size) => {
	breedFor.splice(0, breedFor.length);
	temperaments.splice(0, temperaments.length);
	size.splice(0, size.length);
};

export const filterDataResults = (filters, dogsCharacteristicsData) => {
	let results = [];

	if (
		filters.breedFor.length !== 0 &&
		filters.temperaments.length !== 0 &&
		filters.size.length !== 0
	) {
		const resultsBredFor = dogsCharacteristicsData.filter((dog) => {
			return dog.bredFor.some((bredCharacteristic) =>
				filters.breedFor.includes(bredCharacteristic)
			);
		});

		const resultsTemperament = dogsCharacteristicsData.filter((dog) => {
			return dog.temperaments.some((bredCharacteristic) =>
				filters.temperaments.includes(bredCharacteristic)
			);
		});

		results = [...resultsBredFor, ...resultsTemperament].filter((dog) =>
			filters.size.includes(dog.size)
		);
	}

	if (
		filters.breedFor.length !== 0 &&
		filters.temperaments.length !== 0 &&
		filters.size.length === 0
	) {
		const resultsBredFor = dogsCharacteristicsData.filter((dog) => {
			return dog.bredFor.some((bredCharacteristic) =>
				filters.breedFor.includes(bredCharacteristic)
			);
		});

		const resultsTemperament = dogsCharacteristicsData.filter((dog) => {
			return dog.temperaments.some((bredCharacteristic) =>
				filters.temperaments.includes(bredCharacteristic)
			);
		});

		results = [...resultsBredFor, ...resultsTemperament];
	}

	if (
		filters.breedFor.length !== 0 &&
		filters.temperaments.length === 0 &&
		filters.size.length !== 0
	) {
		const resultsBredFor = dogsCharacteristicsData.filter((dog) => {
			return dog.bredFor.some((bredCharacteristic) =>
				filters.breedFor.includes(bredCharacteristic)
			);
		});

		results = [...resultsBredFor].filter((dog) =>
			filters.size.includes(dog.size)
		);
	}

	if (
		filters.breedFor.length !== 0 &&
		filters.temperaments.length === 0 &&
		filters.size.length === 0
	) {
		const resultsBredFor = dogsCharacteristicsData.filter((dog) => {
			return dog.bredFor.some((bredCharacteristic) =>
				filters.breedFor.includes(bredCharacteristic)
			);
		});

		results = [...resultsBredFor];
	}

	if (
		filters.breedFor.length === 0 &&
		filters.temperaments.length !== 0 &&
		filters.size.length !== 0
	) {
		const resultsTemperament = dogsCharacteristicsData.filter((dog) => {
			return dog.temperaments.some((bredCharacteristic) =>
				filters.temperaments.includes(bredCharacteristic)
			);
		});

		results = [...resultsTemperament].filter((dog) =>
			filters.size.includes(dog.size)
		);
	}

	if (
		filters.breedFor.length === 0 &&
		filters.temperaments.length !== 0 &&
		filters.size.length === 0
	) {
		const resultsTemperament = dogsCharacteristicsData.filter((dog) => {
			return dog.temperaments.some((bredCharacteristic) =>
				filters.temperaments.includes(bredCharacteristic)
			);
		});

		results = [...resultsTemperament];
	}

	if (
		filters.breedFor.length === 0 &&
		filters.temperaments.length === 0 &&
		filters.size.length !== 0
	) {
		const resultsSize = dogsCharacteristicsData.filter((dog) =>
			filters.size.includes(dog.size)
		);
		results = [...resultsSize];
	}

	return results.map((result) => result.id);
};

// CLEARS TICKS FROM UI
export const updatesUiCheckedBox = (checkBox) => {
	const checkBoxInputId = checkBox.name;
	const checkBoxElement = document.getElementById(checkBoxInputId);
	checkBoxElement.checked = false;
};

// DYNAMICALLY CREATES THE CHECKBOXES
export const filterBuilder = (type, filters, onChangeHandler) => {
	switch (type) {
		case 'breedForFilter':
			return filters.map((each, index) => {
				if (!each) {
					// eslint-disable-next-line array-callback-return
					return;
				}

				return (
					<div key={each}>
						<input
							id={each}
							type="checkbox"
							name="breedFor"
							value={each}
							onChange={(e) => {
								onChangeHandler(e);
							}}
						/>
						<label>{each}</label>
					</div>
				);
			});

		case 'temperament':
			return filters.map((each) => {
				if (!each) {
					// eslint-disable-next-line array-callback-return
					return;
				}
				return (
					<div key={each}>
						<input
							id={each}
							type="checkbox"
							name="temperament"
							value={each}
							onChange={(e) => {
								onChangeHandler(e);
							}}
						/>
						<label>{each[0].toUpperCase() + each.substring(1)}</label>
					</div>
				);
			});

		case 'height':
			return filters.map((each) => {
				if (!each) {
					// eslint-disable-next-line array-callback-return
					return;
				}
				return (
					<div key={each}>
						<input
							id={each}
							type="checkbox"
							name="size"
							value={each}
							onChange={(e) => {
								onChangeHandler(e);
							}}
						/>
						<label>
							{each === 'small'
								? 'small'
								: each === 'medium'
								? 'medium'
								: 'large'}
						</label>
					</div>
				);
			});
	}
};
