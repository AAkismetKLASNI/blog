import { Input, Button, Error, H2 } from '../../ui-components/index';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AuthorizationForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 300px;
	gap: 10px;
`;

const AuthorizationContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 35px;
`;

export const RegistrationLayout = ({
	register,
	handleSubmit,
	error,
	onSubmit,
	formError,
	setServerError,
}) => {
	return (
		<AuthorizationContent>
			<H2>Регистрация</H2>
			<AuthorizationForm onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password')}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль..."
					{...register('passcheck')}
				/>
				<Button disabled={!!formError} backgroundcolor="#AFAFAF">
					Регистрация
				</Button>
				{error && <Error>{error}</Error>}
			</AuthorizationForm>
		</AuthorizationContent>
	);
};

RegistrationLayout.propTypes = {
	register: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	error: PropTypes.oneOfType([PropTypes.exact(undefined), PropTypes.string]),
	formError: PropTypes.oneOfType([
		PropTypes.exact(undefined),
		PropTypes.string,
	]),
	onSubmit: PropTypes.func.isRequired,
	setServerError: PropTypes.func.isRequired,
};
