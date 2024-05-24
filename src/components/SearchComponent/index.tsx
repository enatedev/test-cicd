import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import Styles from './searchComponent.module.scss';

interface SearchComponentProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ placeholder, onChange }) => {
  const searchText = useSelector((state: any) => state.searchReducer.searchText);

  return (
    <TextField
      placeholder={placeholder}
      className={Styles.Search}
      variant="outlined"
      value={searchText}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" className={Styles.SearchIconWrapper}>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchComponent;
