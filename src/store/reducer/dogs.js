import * as actionTypes from '../actions/actionTypes';
import updateState from './utility';

const initialState = {
	dogs: [],
	search: '',
	loading: false,
	error: null,
};

const fetchDogsStart = (state) => {
	return updateState(state, { loading: true });
};

const fetchDogsFailed = (state, action) => {
	return updateState(state, { loading: false, error: action.error });
};

const fetchDogSucceeded = (state, action) => {
	return updateState(state, { dogs: action.dogs, loading: false });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_DOGS_START:
			return fetchDogsStart(state);
		case actionTypes.FETCH_DOGS_FAILED:
			return fetchDogsFailed(state, action);
		case actionTypes.FETCH_DOGS_SUCCESS:
			return fetchDogSucceeded(state, action);
		default:
			return state;
	}
};

export default reducer;
