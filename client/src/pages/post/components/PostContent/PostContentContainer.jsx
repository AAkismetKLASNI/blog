import { H2, Icon } from '../../../../ui-components';
import { useNavigate } from 'react-router-dom';
import { OperationPost } from '../Operation-post/OperationPostContainer';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostContentContainer = ({
	post: { id, title, imageUrl, publishedAt, content },
	className,
}) => {
	const navigate = useNavigate();

	const onEdit = () => {
		navigate(`/post/${id}/edit`);
	};

	return (
		<>
			<div className={className}>
				<img src={imageUrl} alt="img" />
				<div className="info-about-post">
					<H2 textAlign="left">{title}</H2>
					<OperationPost
						id={id}
						publishedAt={publishedAt}
						editingButton={
							<Icon
								className="fa fa-pencil-square-o"
								aria-hidden="true"
								onClick={onEdit}
							/>
						}
					/>
					<div className="content-post">{content}</div>
				</div>
			</div>
		</>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		width: 400px;
		float: left;
		margin: 0 20px 10px 0;
	}

	& .content-post {
		text-align: justify;
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
	imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
	publishedAt: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.exact(undefined),
	]),
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
};
