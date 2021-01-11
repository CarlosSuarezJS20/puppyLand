/* eslint-disable default-case */
import React from 'react';

export const removeDublicates = (array) => {
	return array.filter((each, index) => {
		return array.indexOf(each) === index;
	});
};

export const filterBuilder = (type, filters) => {
	switch (type) {
		case 'breedForFilter':
			return filters.map((each) => {
				if (!each) {
					// eslint-disable-next-line array-callback-return
					return;
				}
				return (
					<div>
						<input type="checkbox" name="breedFor" value={each} />
						<label>{each}</label>
					</div>
				);
			});
		case 'temperament':
			console.log(filters);
			return filters.map((each) => {
				if (!each) {
					// eslint-disable-next-line array-callback-return
					return;
				}
				return (
					<div>
						<input type="checkbox" name="temperament" value={each} />
						<label>{each}</label>
					</div>
				);
			});
	}
};
