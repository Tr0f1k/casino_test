import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../GameListSlice';
import { RootState } from '../../Store';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.gameList.searchQuery,
  );

  // Applying field validation instead of request validation from the assignment requirements because request validation
  // has no use in this project. This validation includes entering only English letters and numbers from 0 to 9, and also
  // gives a limit of the symbols, which is 50
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isValidInput = /^[a-zA-Z0-9]*$/.test(value);

    if (isValidInput && value.length <= 50) {
      dispatch(setSearchQuery(value));
    } else if (!isValidInput) {
      console.error(
        'Search query should contain only English letters and numbers (0-9)',
      );
    } else {
      console.error('Search query length cannot exceed 50 characters');
    }
  };

  // Rendering the search bar
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
