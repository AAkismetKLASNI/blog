import { useSelector } from 'react-redux';
import { roleIdSelector } from '../selectors';
import { checkAccess } from '../utils/check-access';
import { H2 } from './H2';
import { Error } from './Error';
import { ERRORS, PROP_TYPES } from '../constants';
import PropTypes from 'prop-types';

export const Content = ({ children, serverError = null, access = [] }) => {
	const userRole = useSelector(roleIdSelector);

	const confirm = checkAccess(access, userRole) ? null : ERRORS.ACCESS_DENIED;

	const error = serverError || confirm;

	return error ? (
		<Error>
			<H2>Ошибка</H2>
			<p>{error}</p>
		</Error>
	) : (
		children
	);
};

Content.propTypes = {
	children: PropTypes.node.isRequired,
	serverError: PropTypes.oneOfType([PropTypes.exact(null), PropTypes.string]),
	access: PropTypes.arrayOf(PROP_TYPES.ROLE),
};
