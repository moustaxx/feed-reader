import { fetchJSON } from '../utils/myFetch';

interface IBody {
	action: string;
	type: string;
	entryIds: string[];
}

const markOneAsRead = async (entryID: string) => {
	const data = await fetchJSON('/v3/markers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			action: 'markAsRead',
			type: 'entries',
			entryIds: [entryID],
		}),
	});
	return data;
};

export default markOneAsRead;
