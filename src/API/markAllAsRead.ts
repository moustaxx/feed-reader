import { AsyncStorage } from 'react-native';

import { fetchRes } from '../utils/myFetch';

interface IInput {
	action: string;
	type: string;
	categoryIds: string[];
	asOf?: Date | number;
	lastReadEntryId?: string;
}

const markAllAsRead = async () => {
	const userID = await AsyncStorage.getItem('userID').catch(err => {
		console.warn('Can not get userID!');
		throw Error(err);
	});
	await fetchRes('/v3/markers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			action: 'markAsRead',
			type: 'categories',
			categoryIds: [`user/${userID}/category/global.all`],
			asOf: Date.now(),
		}),
	});
};

export default markAllAsRead;
