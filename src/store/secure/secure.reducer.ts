import { ISecureState } from '../types';
import { setAuthData, resetSecureStore } from './secure.actions';

type TAction =
	| ReturnType<typeof setAuthData>
	| ReturnType<typeof resetSecureStore>;

const initialState: ISecureState = {
	refreshToken: null,
	accessToken: null,
	userID: null,
};

const secureReducer = (state = initialState, action: TAction): ISecureState => {
	try {
		switch (action.type) {
			case 'SET_AUTH_DATA':
				return {
					...state,
					...action.payload.data,
				};
			case 'RESET_SECURE_STORE':
				return {
					...initialState,
				};
			default:
				return state;
		}
	} catch (error) {
		console.error(error);
		return state;
	}
};

export default secureReducer;
