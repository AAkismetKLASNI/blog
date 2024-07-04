import { Icon } from '../../../../ui-components';
import { useServerRequest } from '../../../../hooks';
import { CLOSE_MODAL, removePostAsync, openModal } from '../../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { roleIdSelector } from '../../../../selectors';
import { ROLES } from '../../../../constants';

const OperationPostContainer = ({
	className,
	id,
	publishedAt,
	editingButton,
}) => {
	const roleId = useSelector(roleIdSelector);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onDeletePost = (id) => {
		dispatch(
			openModal({
				questionText: 'Вы действительно хотите удалить пост',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() =>
						navigate('/'),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div>
				{publishedAt && (
					<Icon
						className="fa fa-calendar-o"
						aria-hidden="true"
						unactive={true}
					/>
				)}
				<span>{publishedAt}</span>
			</div>
			<div>
				{roleId === ROLES.ADMIN ? (
					<>
						{editingButton}
						{publishedAt && (
							<Icon
								className="fa fa-trash-o"
								aria-hidden="true"
								onClick={() => onDeletePost(id)}
							/>
						)}
					</>
				) : null}
			</div>
		</div>
	);
};

export const OperationPost = styled(OperationPostContainer)`
	display: flex;
	justify-content: space-between;
	margin: 20px 0;

	& * {
		display: flex;
		gap: 10px;
		align-items: center;
	}
`;

OperationPost.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editingButton: PropTypes.object.isRequired,
};
