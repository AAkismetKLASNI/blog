import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import {
	loginSelector,
	roleIdSelector,
	sessionSelector,
} from '../../../../selectors';
import { logout } from '../../../../actions';
import { Icon } from '../../../../ui-components';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	min-width: 100px;
`;

const Button = styled.button`
	width: 100%;
	height: 40px;
	cursor: pointer;
`;

const ControlPanel = styled.div`
	font-size: 24px;
	display: flex;
	gap: 10px;
	justify-content: end;
`;

const UserPanel = styled.div`
	display: flex;
	justify-content: end;
	gap: 5px;
	font-size: 20px;
`;

export const HeaderRightLayout = () => {
	const roleId = useSelector(roleIdSelector);
	const login = useSelector(loginSelector);
	const session = useSelector(sessionSelector);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLogout = () => {
		sessionStorage.removeItem('userData');
		dispatch(logout(session));
	};

	return (
		<Content>
			{roleId === ROLES.GUEST ? (
				<Link to="/login">
					<Button>Войти</Button>
				</Link>
			) : (
				<UserPanel>
					<h4>{login}</h4>
					<Link to="/login" onClick={onLogout}>
						<Icon
							fontSize="24px"
							className="fa fa-sign-out"
							aria-hidden="true"
						></Icon>
					</Link>
				</UserPanel>
			)}

			<ControlPanel>
				<Icon
					fontSize="24px"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate(-1, { replace: true })}
					className="fa fa-backward"
					aria-hidden="true"
				></Icon>
				{roleId === ROLES.ADMIN ? (
					<>
						<Link to="/post">
							<Icon
								fontSize="24px"
								className="fa fa-file-text-o"
								aria-hidden="true"
							></Icon>
						</Link>
						<Link to="/users">
							<Icon
								fontSize="24px"
								className="fa fa-users"
								aria-hidden="true"
							></Icon>
						</Link>
					</>
				) : null}
			</ControlPanel>
		</Content>
	);
};
