import { ISecureState } from '../types';

export const setAuthData = (data: Partial<ISecureState>) => {
	return {
		type: 'SET_AUTH_DATA',
		payload: {
			data,
		},
	} as const;
};

export const resetSecureStore = () => {
	return {
		type: 'RESET_SECURE_STORE',
	} as const;
};
