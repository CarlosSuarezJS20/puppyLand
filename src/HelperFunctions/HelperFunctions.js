/* eslint-disable default-case */
import React from 'react';

export const transformHeight = (heightObj) => {
	const { metric } = heightObj;
	const metricArray = metric.split('-').map((n) => +n);

	return (metricArray[0] + metricArray[1]) / 2;
};

export const removeDublicates = (array) => {
	return array.filter((each, index) => {
		return array.indexOf(each) === index;
	});
};

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
							value={each.slice(0, 4)}
							onChange={(e) => {
								onChangeHandler(e, each);
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
								onChangeHandler(e, each);
							}}
						/>
						<label>{each[0].toUpperCase() + each.substring(1)}</label>
					</div>
				);
			});
	}
};
