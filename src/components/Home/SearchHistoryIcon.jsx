import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HistoryIcon from '@mui/icons-material/History';
import { useSearch } from '../../context/SearchProvider';

const styleHistroyIcon = {
  color: 'black',
  fontSize: '25px',
  marginRight: '2rem',
  cursor: 'pointer',
  ':hover': {
    color: '#ddd',
  },
};

export const SearchHistoryIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const { setSearchTerm } = useSearch('');

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(searches);
  }, []);

  const handleHistoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHistoryClose = () => {
    setAnchorEl(null);
  };

  const handleHistorySelect = (term) => {
    setAnchorEl(null);
    setSearchTerm(term);
  };

  return (
    <>
      <HistoryIcon onClick={handleHistoryClick} sx={styleHistroyIcon} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleHistoryClose}
      >
        {searchHistory.map((term, index) => (
          <MenuItem key={index} onClick={() => handleHistorySelect(term)}>
            {term}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
