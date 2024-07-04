import styled from 'styled-components';

const Content = styled.div`
	font-style: italic;
	font-size: 20px;
`;

export const HeaderCenterLayout = () => {
	return (
		<Content>
			<p>Веб-технологии</p>
			<p>Написание кода</p>
			<p>Разбор ошибок</p>
		</Content>
	);
};
