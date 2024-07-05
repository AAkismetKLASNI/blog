import { ACTION_TYPE } from '../action-type';
import axios from 'axios';

export const logout = () => {
	axios.post('http://localhost:3500/logout', null, {
		withCredentials: true,
		credentials: 'include',
	});

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
