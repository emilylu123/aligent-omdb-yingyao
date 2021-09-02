import React from "react";
import './SearchBar.styles.scss'
import SearchYear from './SearchYear/SearchYear'
import SearchType from './SearchType/SearchType'

function SearchBar() {
    return (
        <div>
            <SearchYear />
            <SearchType />    
        </div>
    )
}

export default SearchBar;