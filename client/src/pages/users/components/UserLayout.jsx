import { useState } from 'react';
import { Icon } from '../../../ui-components';
import { useServerRequest } from '../../../hooks';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserContainer = ({
	id,
	login,
	registeredAt,
	roles,
	roleId: userRoleId,
	onDeleteUser,
}) => {
	const [initialRole, setInitialRole] = useState(userRoleId);
	const [selectedRole, setSelectedRole] = useState(userRoleId);

	const onSelectRole = ({ target }) => {
		setSelectedRole(target.value);
	};

	const isSaveButtonDisabled = selectedRole === initialRole;

	const onChangeRole = () => {
		requestServer('updateUserRole', id, selectedRole).then(() =>
			setInitialRole(selectedRole),
		);
	};

	const requestServer = useServerRequest();

	return (
		<li className="table-item">
			<div className="info-user">
				<span>{login}</span>
				<span>{registeredAt}</span>
				<div className="options-user">
					<select value={selectedRole} onChange={onSelectRole}>
						{roles.map(({ id: roleId, name: roleName }) => {
							return (
								<option key={roleId} value={roleId}>
									{roleName}
								</option>
							);
						})}
					</select>
					<Icon
						className="fa fa-floppy-o"
						aria-hidden="true"
						onClick={onChangeRole}
						disabled={isSaveButtonDisabled}
					/>
				</div>
			</div>
			<Icon
				className="fa fa-trash-o"
				aria-hidden="true"
				onClick={() => onDeleteUser(id)}
			/>
		</li>
	);
};

export const User = styled(UserContainer)``;

User.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roles: PropTypes.array.isRequired,
	roleId: PropTypes.string.isRequired,
	onDeleteUser: PropTypes.func.isRequired,
};
