import { ISecureState } from '../types';

export const setLoginStatus = (data: Partial<ISecureState>) => {
	return {
		type: 'SET_AUTH_DATA',
		payload: {
			data,
		},
	} as const;
};

export const resetSecureData = () => {
	return {
		type: 'RESET_SECURE_DATA',
	} as const;
};
