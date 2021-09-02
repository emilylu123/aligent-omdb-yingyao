import React, { useState } from "react";
import "./SearchBar.styles.scss";
import SearchYear from "./SearchYear/SearchYear";
import SearchType from "./SearchType/SearchType";
import { Search } from "@material-ui/icons";
import { TextField, Grid } from "@material-ui/core";

function SearchBar() {
  const [type, setType] = useState("");
  const [year, setYear] = useState({});

  function handleTypeChange(event) {
    // console.log(event.target);
    setType(event.target);
    console.log("type", type);
  }

  function handleYearChange(event) {
    console.log("year", event.target);
  }

  return (
    <Grid container xs={12} className="search-bar">
      <Grid item xs justifyContent="flex-start">
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          className="search-field"
        >
          <Grid item>
            <Search />
          </Grid>
          <Grid item>
            <TextField
              id="search-input"
              type="text"
              placeholder="Search Movies"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs spacing={1} justifyContent="flex-end">
        <SearchYear year={year} onChange={handleYearChange} />
      </Grid>
      <Grid item xs spacing={1} justifyContent="flex-end">
        <SearchType type={type} onChange={handleTypeChange} />
      </Grid>
    </Grid>
  );
}

export default SearchBar;
