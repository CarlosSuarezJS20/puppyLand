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
		size = 'medium';
	} else if ((metricArray[0] + metricArray[1]) / 2 <= 39.5) {
		size = 'small';
	} else {
		size = 'large';
	}

	return size;
};

// reorganises original servers data
export const dataFromServerModeler = (data) => {
	return data.map((dog) => {
		return {
			bred_for: dog.bred_for,
			id: dog.id,
			image: dog.image,
			name: dog.name,
			temperament: dog.temperament,
			height: transformHeight(dog.height),
		};
	});
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
					characteristics: dog.bred_for
						.replace(',', ' ')
						.split(' ')
						.concat(dog.temperament.replace(',', ' ').split(' '))
						.map((word) => word.toLowerCase()),
					height: transformHeight(dog.height),
				};
			}
		})
		.filter((dog) => dog);
};

// reorganises the intial filters property from state for filtering
export const filtersDataModeler = (data) => {
	return data
		.filter((filter) => filter.isChecked)
		.map((filter) => {
			if (isNaN(filter.name)) {
				return filter.name.slice(0, filter.name.length - 3);
			} else {
				return filter.name;
			}
		});
};

// Data re-structuring

// REMOVES DUPLICATES FROM FILTERS

export const removeDublicates = (array) => {
	return array.filter((each, index) => {
		return array.indexOf(each) === index;
	});
};

// Data Strings into Arrays for Bred For
export const bredForArray = (data) => {
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
							type="checkbox"
							name="breedFor"
							value={each.slice(0, each.length - 3)}
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
							type="checkbox"
							name="height"
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
