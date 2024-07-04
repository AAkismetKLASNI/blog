import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, unactive, ...props }) => {
	return <i className={className} {...props}></i>;
};

export const Icon = styled(IconContainer)`
	font-size: ${({ fontSize = '20px' }) => fontSize};
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
	display: ${({ datainvisible }) => (datainvisible ? 'none' : 'block')};
	cursor: ${({ unactive, disabled }) =>
		unactive || disabled ? 'default' : 'pointer'};
`;

Icon.propTypes = {
	unactive: PropTypes.bool,
};
