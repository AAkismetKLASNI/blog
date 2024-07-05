import { RegistrationLayout } from './RegistrationLayout';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useResetForm } from '../../hooks';
import axios from 'axios';

const registrationSceme = yup.object().shape({
	login: yup
		.string()
		.matches(/^\w+$/, 'Недопустимые символы в логине.')
		.min(3, 'Неверно введен логин. Не меньше 3 символов')
		.max(15, 'Неверно введен логин. Не больше 15 символов')
		.required('Введите логин'),
	password: yup
		.string()
		.matches(/^[\w#%]+$/, 'Недопустимые символы в пароле')
		.min(6, 'Неверно введен пароль. Не меньше 6 символов')
		.max(30, 'Неверно введен пароль. Не больше 30 символов')
		.required('Введите пароль'),
	passcheck: yup
		.string()
		.required('Введите повторно пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const RegistrationContainerPage = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '', passcheck: '' },
		resolver: yupResolver(registrationSceme),
	});

	useResetForm(reset);

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;
	const error = serverError || formError;

	const onSubmit = ({ login, password }) => {
		axios
			.post(
				'http://localhost:3500/register',
				{ login, password },
				{ withCredentials: true, credentials: 'include' },
			)
			.then(({ status, data: { error, user } }) => {
				if (error) {
					setServerError(error);
					return;
				}

				if (status === 200) {
					dispatch(setUserAction(user));
					sessionStorage.setItem('userData', JSON.stringify(user));
					navigate('/');
				}
			});
	};

	return (
		<RegistrationLayout
			register={register}
			handleSubmit={handleSubmit}
			error={error}
			onSubmit={onSubmit}
			formError={formError}
			setServerError={setServerError}
		/>
	);
};
