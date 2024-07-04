import { Button } from './Button';
import { useSelector } from 'react-redux';
import {
	ModalOnCancelSelector,
	ModalOnConfirmSelector,
	ModalQuestionSelector,
	ModalIsOpenSelector,
} from '../selectors';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(ModalIsOpenSelector);
	const questionText = useSelector(ModalQuestionSelector);
	const onConfirm = useSelector(ModalOnConfirmSelector);
	const onCancel = useSelector(ModalOnCancelSelector);

	if (!isOpen) {
		return;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{questionText}</h3>
				<div className="buttons-container">
					<Button width="170px" onClick={onConfirm}>
						Ок
					</Button>
					<Button width="170px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		position: relative;
		z-index: 30;
		width: 400px;
		padding: 20px;
		background-color: #fff;
		margin: 0 auto;
		transform: translate(0, -50%);
		top: 50%;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	& .buttons-container {
		display: flex;
		gap: 5px;
	}
`;
