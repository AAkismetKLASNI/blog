import { ACTION_TYPE } from '../action-type';

export const setLoadPost = (loadedPost) => ({
	type: ACTION_TYPE.SET_LOAD_POST,
	payload: loadedPost,
});
