import { Button } from '../../../../ui-components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationContainer = ({ className, setPage, page, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Прошлая
			</Button>
			<div className="current-page">{page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 30px;
`;

Pagination.propTypes = {
	setPage: PropTypes.func.isRequired,
	lastPage: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
};
