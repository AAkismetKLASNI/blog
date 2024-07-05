import { useEffect, useState } from 'react';
import { H2, Content } from '../../ui-components';
import { User } from './components/UserLayout';
import { ROLES } from '../../constants';
import { checkAccess } from '../../utils/check-access';
import { useSelector } from 'react-redux';
import { roleIdSelector } from '../../selectors';
import axios from 'axios';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorFetch, setErrorFetch] = useState(null);
	const [switchDeleteUser, setSwitchDeleteUser] = useState(false);
	const userRole = useSelector(roleIdSelector);

	console.log(users);

	useEffect(() => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}

		Promise.all([
			axios.get('http://localhost:3500/users/roles', {
				withCredentials: true,
				credentials: 'include',
			}),
			axios.get('http://localhost:3500/users', {
				withCredentials: true,
				credentials: 'include',
			}),
		]).then(([rolesRes, usersRes]) => {
			if (rolesRes.error || usersRes.error) {
				setErrorFetch(rolesRes.error || usersRes.error);
				return;
			}

			console.log('usersRes.data.data', usersRes.data.data);

			setRoles(rolesRes.data.data);
			setUsers(usersRes.data.data);
		});
	}, [switchDeleteUser, userRole]);

	const onDeleteUser = (userId) => {
		if (!checkAccess([ROLES.ADMIN], userRole)) {
			return;
		}

		axios
			.delete(`http://localhost:3500/users/${userId}`, {
				withCredentials: true,
				credentials: 'include',
			})
			.then(() => setSwitchDeleteUser(!switchDeleteUser));
	};

	return (
		<div className={className}>
			<Content serverError={errorFetch} access={[ROLES.ADMIN]}>
				<H2>Пользователи</H2>
				<div className="table-container">
					<div className="table-titles">
						<span>Логин</span>
						<span>Дата регистрации</span>
						<span>Роль</span>
					</div>
					<ul className="table-content">
						{users.map(({ id, login, registeredAt, roleId }) => {
							return (
								<User
									id={id}
									key={id}
									login={login}
									registeredAt={registeredAt}
									roles={roles.filter(({ id }) => id !== ROLES.GUEST)}
									roleId={roleId}
									onDeleteUser={onDeleteUser}
								/>
							);
						})}
					</ul>
				</div>
			</Content>
		</div>
	);
};

export const UsersPage = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px;

	& .table-container,
	.table-content {
		display: flex;
		flex-direction: column;
	}

	& .table-content {
		gap: 10px;
	}

	& .table-item {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	& .table-titles {
		padding: 10px;
	}

	& .table-titles span {
		display: inline-block;
		width: 170px;
	}

	& .info-user {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 2px solid black;
		padding: 10px;
		width: 100%;
	}

	& .info-user span {
		width: 170px;
	}

	& .options-user {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 160px;
	}

	& .options-user select {
		height: 30px;
		width: 100%;
		font-size: 16px;
	}
`;
