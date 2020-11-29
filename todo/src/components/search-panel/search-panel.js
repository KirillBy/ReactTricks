import React from 'react';
import './search-panel.css';

const SearchPanel = () => {
    const searchText = 'Type here to search';
    const searchStyle = {
      fontSize: '15px'
    };
    return (
      <input placeholder={searchText} style ={searchStyle}/>
    );
  };

export default SearchPanel;
  