import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Grid } from "@material-ui/core";

export default function HomePage() {
  const [movies, setMovies] = useState({});
  const [movieInfo, setMovieInfo] = useState({});
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  const API_KEY = "866364e";
  const listURL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&type=${type}&y=${year}`;
  const detailURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${search}`;

  const getMovies = async () => {
    try {
      const response = await fetch(listURL);
      const data = await response.json();
      setMovies(data);
      console.log("getMovies successful: ", movies.Search);
    } catch (e) {
      console.error(e.toString);
    }
  };

  const getMovieDetail = async () => {
    try {
      const response = await fetch(detailURL);
      const data = await response.json();
      console.log("data", data);
      setMovieInfo(data);
      console.log("getMovieDetail: ", movieInfo);
    } catch (e) {
      console.error(e.toString);
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    getMovies();
  };

  const handleTypeChange = (type) => {
    console.log("ttt", type);
    setType(type);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    getMovies(); //fetch data from api
  }, []);

  return (
    <div className="homepage">
      <Grid container>
        <Grid item xs={12}>
          <SearchBar
            value={search}
            type={type}
            year={year}
            onChange={handleInputChange}
            onChangeType={() => handleTypeChange(type)}
            onChangeYear={() => handleYearChange(year)}
          />
          <input type="text" value={search} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12}>
          {movies.Response === "True" ? (
            <SearchResult result={movies} detailInfo={movieInfo} />
          ) : (
            <p>No Movie found</p>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
