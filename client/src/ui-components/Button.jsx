import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ className, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	background-color: ${({ backgroundcolor = '#efefef' }) => backgroundcolor};
	height: 40px;
	border: 1px solid black;
	cursor: pointer;
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
};
