import * as actionTypes from '../actions/actionTypes';
import updateState from './utility';

const initialState = {
	dogs: [],
	oneDog: [],
	loading: true,
	loadingDog: false,
	error: null,
};

// Fetching all dogs from server

const fetchDogsStart = (state) => {
	return updateState(state, { loading: true });
};

const fetchDogsFailed = (state, action) => {
	return updateState(state, { loading: false, error: action.error });
};

const fetchDogsSucceeded = (state, action) => {
	return updateState(state, { dogs: action.dogs, loading: false });
};

//Fetching one dog from server

const fetchTheDogStart = (state) => {
	return updateState(state, { loadingDog: true });
};

const fetchTheDogFailed = (state, action) => {
	return updateState(state, { loadingDog: false, error: action.error });
};

const fetchTheDogSucceeded = (state, action) => {
	return updateState(state, { oneDog: action.dog, loadingDog: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_DOGS_START:
			return fetchDogsStart(state);
		case actionTypes.FETCH_DOGS_FAILED:
			return fetchDogsFailed(state, action);
		case actionTypes.FETCH_DOGS_SUCCESS:
			return fetchDogsSucceeded(state, action);
		case actionTypes.FETCH_ONE_DOG_START:
			return fetchTheDogStart(state);
		case actionTypes.FETCH_ONE_DOG_FAILED:
			return fetchTheDogFailed(state, action);
		case actionTypes.FETCH_ONE_DOG_SUCCESS:
			return fetchTheDogSucceeded(state, action);
		default:
			return state;
	}
};

export default reducer;
