import { fetchRes } from '../utils/myFetch';

const logout = async () => {
	await fetchRes('/v3/auth/logout', { method: 'POST' });
};

export default logout;
