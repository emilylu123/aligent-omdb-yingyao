import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Grid } from "@material-ui/core";

export default function HomePage() {
  const [movies, setMovies] = useState({});
  const [search, setSearch] = useState("star wars");

  const getMovies = () => {};

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    getMovies();
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <SearchBar />
          <input type="text" value={search} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12}>
          <SearchResult result={movies} />;
        </Grid>
      </Grid>
    </div>
  );
}
