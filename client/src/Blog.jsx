import styled from 'styled-components';
import { Header, Footer, Main } from './Layouts';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAction } from './actions';
import { Modal } from './ui-components';

const BlogContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	margin: 0 auto;
	min-height: 100%;
	background-color: #fff;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUserAction({ ...currentUserData, roleId: currentUserData.roleId }),
		);
	}, []);

	return (
		<BlogContainer>
			<Header />
			<Main />
			<Modal />
			<Footer />
		</BlogContainer>
	);
};
