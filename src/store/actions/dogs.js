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
		type: actionTypes.FETCH_DOGS_START,
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
					});
				}
				dispatch(fetchDogsSuccessful(fetchedDogs));
			})
			.catch((error) => {
				dispatch(fetchDogsFailed(error));
			});
	};
};

// FETCHING ONE DOG

export const fetchOneDogSuccessful = (dbDog) => {
	return {
		type: actionTypes.FETCH_ONE_DOG_SUCCESS,
		dog: dbDog,
	};
};

export const fetchOneDogFailed = (errorMsg) => {
	return {
		type: actionTypes.FETCH_ONE_DOG_FAILED,
		error: errorMsg,
	};
};

export const fetchOneDogStarts = () => {
	return {
		type: actionTypes.FETCH_ONE_DOG_START,
	};
};

export const fetchOneDogFromServer = (id) => {
	return (dispatch) => {
		dispatch(fetchOneDogStarts());
		axios
			.get(`/images/search?breed_ids=${id}`)
			.then((res) => {
				const fetchedDog = [];
				for (let dog in res.data) {
					fetchedDog.push({
						...res.data[dog],
					});
				}
				dispatch(fetchOneDogSuccessful(fetchedDog));
			})
			.catch((error) => {
				dispatch(fetchOneDogFailed(error));
			});
	};
};

// Gets the id for the dog-details page

export const getIdForDetailsPage = (id) => {
	return {
		type: actionTypes.GET_ID_FOR_DETAILS_PAGE,
		id: id,
	};
};
