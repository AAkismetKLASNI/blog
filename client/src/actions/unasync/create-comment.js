import { ACTION_TYPE } from '../action-type';

export const createComment = (comment) => ({
	type: ACTION_TYPE.CREATE_COMMENT,
	payload: comment,
});
