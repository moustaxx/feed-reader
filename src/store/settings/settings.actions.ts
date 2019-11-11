import { ISettingsState } from '../types';

export const setSettings = (data: Partial<ISettingsState>) => {
	return {
		type: 'SET_SETTINGS',
		payload: {
			data,
		},
	} as const;
};

export const resetSettings = () => {
	return {
		type: 'RESET_SETTINGS',
	} as const;
};
