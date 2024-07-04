import styled from 'styled-components';

const Feedback = styled.div`
	font-weight: bold;
`;

export const FooterLeftLayout = () => {
	return (
		<Feedback>
			<p>Блог веб-разработчика</p>
			<p>web@developer.ru</p>
		</Feedback>
	);
};
