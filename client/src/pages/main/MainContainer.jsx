import { useState } from 'react';
import { Search, Posts, Pagination } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [page, setPage] = useState(1);
	const [searchBarPhrase, setSearchBarPhrase] = useState('');
	const [switchReadyPhrase, setSwitchReadyPhrase] = useState(false);
	const [lastPage, setLastPage] = useState(1);

	return (
		<div className={className}>
			<div className="wrapper">
				<Search
					searchBarPhrase={searchBarPhrase}
					setSearchBarPhrase={setSearchBarPhrase}
					setSwitchReadyPhrase={setSwitchReadyPhrase}
					switchReadyPhrase={switchReadyPhrase}
				/>
				<Posts
					page={page}
					searchBarPhrase={searchBarPhrase}
					setLastPage={setLastPage}
					switchReadyPhrase={switchReadyPhrase}
				/>
			</div>

			{lastPage > 1 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};

export const MainPage = styled(MainContainer)`
	display: flex;
	min-height: 650px;
	gap: 30px;
	flex-direction: column;
	justify-content: space-between;

	& .wrapper {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
`;
