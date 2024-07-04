import { useEffect, useLayoutEffect, useState } from 'react';
import { Comments, PostContent, PostEdit } from './components';
import { useServerRequest } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { useMatch, useParams } from 'react-router-dom';
import { postSelector } from '../../selectors';
import { Content, Error } from '../../ui-components';
import styled from 'styled-components';
import { ROLES } from '../../constants';

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const isEditing = useMatch('/post/:id/edit');
	const isCreating = useMatch('/post');
	const post = useSelector(postSelector);
	const requestServer = useServerRequest();
	const params = useParams();
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id)).then((error) => {
			setError(error);
			setIsLoading(false);
		});
	}, [requestServer, params.id, dispatch, isCreating]);

	if (isLoading) {
		return null;
	}

	return (
		<>
			{error ? (
				<Error>{error}</Error>
			) : (
				<>
					{isEditing || isCreating ? (
						<Content access={[ROLES.ADMIN]} serverError={error}>
							<PostEdit post={post} />
						</Content>
					) : (
						<div className={className}>
							<PostContent post={post} />
							<Comments id={post.id} comments={post.comments} />
						</div>
					)}
				</>
			)}
		</>
	);
};

export const PostPage = styled(PostContainer)`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
