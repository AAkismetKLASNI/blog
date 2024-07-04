import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = forwardRef(
	({ className, unStrokePanel, ...props }, ref) => {
		return <input className={className} {...props} ref={ref} />;
	},
);

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	border: ${({ unStrokePanel }) => (unStrokePanel ? '0px' : '1px solid black')};
	padding: 10px;
	font-size: 18px;
	height: 40px;
`;

Input.propTypes = {
	unStrokePanel: PropTypes.bool,
};
