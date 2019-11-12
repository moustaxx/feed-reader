import { fetchRes } from '../utils/myFetch';
import { store } from '../store';
import { resetSecureStore } from '../store/secure/secure.actions';

const logout = async () => {
	await fetchRes('/v3/auth/logout', { method: 'POST' });
	store.dispatch(resetSecureStore());
};

export default logout;
