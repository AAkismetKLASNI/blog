import axios from 'axios';
import { setLoadPost } from '../index';

export const loadPostAsync = (postId) => (dispatch) =>
	axios
		.get(`http://localhost:3500/posts/${postId}`, {
			withCredentials: true,
			credentials: 'include',
		})
		.then(({ data: { data: post }, error }) => {
			if (error) {
				return error;
			}

			dispatch(setLoadPost(post));
		});
