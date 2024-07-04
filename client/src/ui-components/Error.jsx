import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorContent = ({ children, className }) => {
	return <div className={className}>{children}</div>;
};

export const Error = styled(ErrorContent)`
	text-align: center;
`;

Error.propTypes = {
	children: PropTypes.node.isRequired,
};
