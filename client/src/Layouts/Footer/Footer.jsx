import { styled } from 'styled-components';
import { FooterLeftLayout, FooterRightLayout } from './components/index';

const FooterContainer = styled.footer`
	height: 120px;
	box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.5);
	padding: 0 50px;
	position: fixed;
	bottom: 0;
	width: 1000px;
	background-color: #fff;
	z-index: 10;
`;

const FooterNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

export const Footer = () => {
	return (
		<FooterContainer>
			<FooterNav>
				<FooterLeftLayout />
				<FooterRightLayout />
			</FooterNav>
		</FooterContainer>
	);
};
