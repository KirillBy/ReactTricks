import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  
  state = {
    label: ''
  };

  searchText = 'Type here to search';

  searchStyle = {
    fontSize: '15px'
  };

  onSearchChange = (e) => {
    const label = e.target.value;
    this.setState({label});
    this.props.onSearch(label);
  };
  render() {
    return (
      <input type="text" 
            placeholder={this.searchText} 
            style ={this.searchStyle}
            value={this.state.label}
            onChange={this.onSearchChange}
      />
    );
  }
  };

