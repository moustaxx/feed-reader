import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export interface ISettings {
	articlePictureOnLeft: boolean;
}

const initalData: ISettings = {
	articlePictureOnLeft: false,
};

const useSettings = () => {
	const [loading, setLoading] = React.useState(true);
	const [state, setState] = React.useState<ISettings>(initalData);

	const setSettings = async (partialSettings: Partial<ISettings>) => {
		const newSettings = { ...state, ...partialSettings };
		await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
		setState(newSettings);
	};

	useEffect(() => {
		const initSettings = async () => {
			const res = await AsyncStorage.getItem('settings');
			if (!res) await setSettings(initalData);
			else {
				const parsedSettings: ISettings = JSON.parse(res);
				setState(parsedSettings);
			}

			setLoading(false);
		};

		initSettings();
	}, []);

	return {
		loading,
		settings: state,
		setSettings,
	} as const;
};

export default useSettings;

type ISettingsContext = readonly [
	ISettings,
	(partialSettings: Partial<ISettings>) => Promise<void>
];

export const SettingsContext = React.createContext<ISettingsContext>(
	[{} as any, async () => { }],
);
