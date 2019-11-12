import { fetchRes } from '../utils/myFetch';
import { store } from '../store';

interface IInput {
	action: string;
	type: string;
	categoryIds: string[];
	asOf?: Date | number;
	lastReadEntryId?: string;
}

const markAllAsRead = async () => {
	const { userID } = store.getState().secure;
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
