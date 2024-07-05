import { useState } from 'react';
import { Icon } from '../../../ui-components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

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
		axios
			.patch(
				`http://localhost:3500/users/${id}`,
				{ roleId: selectedRole },
				{ withCredentials: true, credentials: 'include' },
			)
			.then(() => {
				setInitialRole(selectedRole);
			});
	};

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
	roleId: PropTypes.number.isRequired,
	onDeleteUser: PropTypes.func.isRequired,
};
