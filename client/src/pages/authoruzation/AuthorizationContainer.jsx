import { AuthorizationLayout } from './AuthorizationLayout';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useResetForm, useServerRequest } from '../../hooks';

const authorizationSceme = yup.object().shape({
	login: yup
		.string()
		.matches(/^\w+$/, 'Недопустимые символы в логине.')
		.min(3, 'Неверно введен логин. Не меньше 3 символов	')
		.max(15, 'Неверно введен логин. Не больше 15 символов')
		.required('Введите логин'),
	password: yup
		.string()
		.matches(/^[\w#%]+$/, 'Недопустимые символы в пароле')
		.min(6, 'Неверно введен пароль. Не меньше 6 символов')
		.max(30, 'Неверно введен пароль. Не больше 30 символов')
		.required('Введите пароль'),
});

export const AuthorizationContainerPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '' },
		resolver: yupResolver(authorizationSceme),
	});

	useResetForm(reset);

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const requestServer = useServerRequest();

	const formError = errors?.login?.message || errors?.password?.message;
	const error = serverError || formError;

	const onSubmit = ({ login, password }) => {
		requestServer('authorize', login, password).then(({ error, res }) => {
			if (error) {
				setServerError(error);
				return;
			}

			dispatch(setUserAction(res));
			sessionStorage.setItem('userData', JSON.stringify(res));

			navigate('/');
		});
	};

	return (
		<AuthorizationLayout
			register={register}
			handleSubmit={handleSubmit}
			error={error}
			onSubmit={onSubmit}
			formError={formError}
			setServerError={setServerError}
		/>
	);
};
