import { useLayoutEffect, useRef, useState } from 'react';
import { Input, Icon, H2 } from '../../../../ui-components';
import { useNavigate } from 'react-router-dom';
import { OperationPost } from '../Operation-post/OperationPostContainer';
import { sanitizeContent } from './utils/sanitizeContent';
import { savePostAsync } from '../../../../actions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostEditContainer = ({
	post: { id, title, imageUrl, publishedAt, content },
	className,
}) => {
	const [imagePost, setImagePost] = useState(imageUrl);
	const [titlePost, setTitlePost] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImagePost(imageUrl);
		setTitlePost(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				title: titlePost,
				imageUrl: imagePost,
				content: newContent,
			}),
		).then(({ id }) => {
			navigate(`/post/${id}`);
		});
	};

	const onChangeImage = ({ target }) => setImagePost(target.value);
	const onChangeTitle = ({ target }) => setTitlePost(target.value);

	return (
		<div className={className}>
			<H2 margin="10px 0 10px 0">Картинка</H2>
			<Input value={imagePost} onChange={onChangeImage} type="text" />
			<div className="info-about-post">
				<H2 margin="10px 0 10px 0">Заголовок</H2>
				<Input value={titlePost} onChange={onChangeTitle} />
				<OperationPost
					id={id}
					publishedAt={publishedAt}
					editingButton={<Icon className="fa fa-floppy-o" onClick={onSave} />}
				/>
				<div
					ref={contentRef}
					contentEditable={true}
					suppressContentEditableWarning={true}
					className="content-post"
				>
					{content}
				</div>
			</div>
		</div>
	);
};

export const PostEdit = styled(PostEditContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .content-post {
		text-align: justify;
		white-space: pre-line;
		border: 1px solid #000;
		min-height: 80px;
	}
`;

PostEdit.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
	imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
	publishedAt: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.exact(undefined),
	]),
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(undefined)]),
};
