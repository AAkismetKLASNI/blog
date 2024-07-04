import PropTypes from 'prop-types';
import { ROLES } from './roles-id';

export const PROP_TYPES = {
	ROLE: PropTypes.oneOf(Object.values(ROLES)),
};
