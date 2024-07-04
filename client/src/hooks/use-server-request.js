import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../bff/index';
import { sessionSelector } from '../selectors';

export const useServerRequest = () => {
	const session = useSelector(sessionSelector);

	return useCallback(
		(operation, ...params) => {
			const request = [
				'register',
				'authorize',
				'fetchPost',
				'fetchComments',
				'fetchPosts',
			].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
