import { fetchRes } from '../utils/myFetch';

interface IBody {
	action: string;
	type: string;
	entryIds: string[];
}

const markOneAsRead = async (entryID: string) => {
	const data = await fetchRes('/v3/markers', {
		method: 'POST',
		body: JSON.stringify({
			action: 'markAsRead',
			type: 'entries',
			entryIds: [entryID],
		}),
	});
	return data;
};

export default markOneAsRead;
