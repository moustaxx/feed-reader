import { ISecureState } from '../types';
import { setLoginStatus, resetSecureData } from './secure.actions';

type TAction =
	| ReturnType<typeof setLoginStatus>
	| ReturnType<typeof resetSecureData>;

const initialState: ISecureState = {
	status: 'LOGGED_OUT',
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
			case 'RESET_SECURE_DATA':
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
