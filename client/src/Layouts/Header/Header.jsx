import styled from 'styled-components';
import {
	HeaderLeftLayout,
	HeaderCenterLayout,
	HeaderRightLayout,
} from './components';

const HeaderContainer = styled.header`
	height: 120px;
	box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.5);
	padding: 0 50px;
	position: fixed;
	width: 1000px;
	z-index: 10;
	background-color: #fff;
`;

const HeaderNav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

export const Header = () => {
	return (
		<HeaderContainer>
			<HeaderNav>
				<HeaderLeftLayout />
				<HeaderCenterLayout />
				<HeaderRightLayout />
			</HeaderNav>
		</HeaderContainer>
	);
};
