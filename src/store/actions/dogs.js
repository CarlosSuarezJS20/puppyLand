import * as actionTypes from './actionTypes';
import axios from '../../axios';

// FETCH INFO DOGS FROM SERVER

export const fetchDogsSuccessful = (dbDogs) => {
	return {
		type: actionTypes.FETCH_DOGS_SUCCESS,
		dogs: dbDogs,
	};
};

export const fetchDogsFailed = (errorMsg) => {
	return {
		type: actionTypes.FETCH_DOGS_FAILED,
		error: errorMsg,
	};
};

export const fetchDogsStarts = () => {
	return {
		type: actionTypes.FETCH_DOGS_SUCCESS,
	};
};

export const fetchDogsFromServer = () => {
	return (dispatch) => {
		dispatch(fetchDogsStarts());
		axios
			.get('/breeds')
			.then((res) => {
				const fetchedDogs = [];
				for (let dog in res.data) {
					fetchedDogs.push({
						...res.data[dog],
						id: dog,
					});
				}
				dispatch(fetchDogsSuccessful(fetchedDogs));
			})
			.catch((error) => {
				dispatch(fetchDogsFailed(error));
			});
	};
};
