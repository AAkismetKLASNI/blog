import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Content = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Logo = styled.div`
	font-size: 80px;
`;

const H1 = styled.h1`
	font-size: 56px;
	font-weight: 600;
`;

const Span = styled.span`
	font-size: 20px;
	font-weight: 600;
`;

export const HeaderLeftLayout = () => {
	return (
		<Link to="/">
			<Content>
				<Logo>
					<i className="fa fa-code" aria-hidden="true"></i>
				</Logo>
				<div>
					<H1>Блог</H1>
					<Span>веб-разработчика</Span>
				</div>
			</Content>
		</Link>
	);
};
