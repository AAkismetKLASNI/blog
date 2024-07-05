import { useEffect, useState } from 'react';
import { Post } from './components';
import { PAGINATION_LIMIT } from '../../../../constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

const PostsContainer = ({
	className,
	page,
	setLastPage,
	searchBarPhrase,
	switchReadyPhrase,
}) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		axios
			.get(
				`http://localhost:3500/posts?search=${searchBarPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
			)
			.then(({ status, data: { data } }) => {
				if (status === 200) {
					const { lastPage, posts } = data;
					setLastPage(lastPage);
					setPosts(posts);
					setLoading(true);
				}
			});
	}, [
		page,
		switchReadyPhrase,
		setLastPage,
		setPosts,
		setLoading,
		searchBarPhrase,
	]);

	return (
		<div className={className}>
			{loading ? (
				<>
					{posts.length ? (
						<ul className="test">
							{posts.map(({ title, imageUrl, id, publishedAt, comments }) => (
								<Post
									key={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									comments={comments.length}
									id={id}
								/>
							))}
						</ul>
					) : (
						<div>
							<p className="not-found-posts">Таких постов не существует</p>
						</div>
					)}
				</>
			) : null}
		</div>
	);
};

export const Posts = styled(PostsContainer)`
	& .test {
		display: grid;
		grid-template-columns: 260px 260px 260px;
		row-gap: 30px;
		justify-content: space-between;
	}

	& .not-found-posts {
		text-align: center;
	}
`;

Posts.propTypes = {
	page: PropTypes.number.isRequired,
	setLastPage: PropTypes.func.isRequired,
	searchBarPhrase: PropTypes.string.isRequired,
	switchReadyPhrase: PropTypes.bool.isRequired,
};
