import { ACTION_TYPE } from '../action-type';

export const setUserAction = (user) => {
	return {
		type: ACTION_TYPE.SET_USER,
		payload: user,
	};
};
