import { useState } from 'react';
import { Icon } from '../../../../ui-components';
import { useServerRequest } from '../../../../hooks';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { idSelector, roleIdSelector } from '../../../../selectors';
import { createCommentPostAsync } from '../../../../actions';
import { ROLES } from '../../../../constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommentsContainer = ({ className, id, comments }) => {
	const [newComment, setNewComment] = useState('');

	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const authorId = useSelector(idSelector);
	const roleId = useSelector(roleIdSelector);

	const error =
		roleId === ROLES.GUEST || !newComment || newComment.length > 200;

	const onCreateNewComment = (content, postId, authorId) => {
		if (content.length < 1 || content.length > 200) {
			return;
		}

		dispatch(createCommentPostAsync(requestServer, content, postId, authorId));
		setNewComment('');
	};

	return (
		<>
			<div className={className}>
				<div className="create-new-comment-block">
					<textarea
						disabled={ROLES.GUEST === roleId}
						value={newComment}
						onChange={({ target }) => setNewComment(target.value)}
						className="field-new-comment"
						placeholder="Комментарий..."
					></textarea>
					<Icon
						className="fa fa-paper-plane-o"
						aria-hidden="true"
						disabled={error}
						onClick={() => onCreateNewComment(newComment, id, authorId)}
					/>
				</div>
				<ul className="comments-container">
					{comments.map(({ id, content, author, publishedAt }) => {
						return (
							<Comment
								key={id}
								id={id}
								content={content}
								author={author}
								publishedAt={publishedAt}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export const Comments = styled(CommentsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;

	& .create-new-comment-block {
		display: flex;
		gap: 5px;
	}

	& .field-new-comment {
		max-width: 700px;
		max-height: 160px;
		min-width: 700px;
		min-height: 160px;
		padding: 10px;
		font-size: 18px;
	}

	& .comments-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;

Comments.propTypes = {
	id: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
};
