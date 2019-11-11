import { ISettingsState } from '../types';
import { setSettings, resetSettings } from './settings.actions';

type TAction =
	| ReturnType<typeof setSettings>
	| ReturnType<typeof resetSettings>;

const initialState: ISettingsState = {
	articlePictureOnLeft: false,
};
const settingsReducer = (state = initialState, action: any): ISettingsState => {
	try {
		switch (action.type) {
			case 'SET_SETTINGS':
				return {
					...state,
					...action.payload.data,
				};
			case 'RESET_SETTINGS':
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

export default settingsReducer;
