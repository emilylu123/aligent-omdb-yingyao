import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  const [movies, setMovies] = useState({});
  const [search, setSearch] = useState({
    keyword: "star",
    year: [1970, 2021],
    type: "",
  });
  const [page, setPage] = useState(1);

  const API_KEY = "866364e";
  const listURL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search.keyword}&type=${search.type}&page=${page}`;
  const detailURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${search.keyword}`;

  // async function to fetch movie list(array) from OMDB API
  // each movie is shown as {Poster,Title,Type,Year,imdbID}
  const getMovies = async () => {
    try {
      const response = await fetch(listURL);
      const data = await response.json();
      console.log("Get Movie data ->>", data);
      setMovies(data);
    } catch (e) {
      console.error(e.toString);
    }
  };

  function handleChangeYear(value) {
    setSearch((prev) => {
      return {
        keyword: prev.keyword,
        year: value,
        type: prev.type,
      };
    });
  }

  function handleChangeType(e) {
    console.log("handleChangeType", e.target.value);
    setSearch((prev) => {
      return {
        keyword: prev.keyword,
        year: prev.year,
        type: e.target.value,
      };
    });
    getMovies();
  }

  function handleChangeSearch(event) {
    const { name, value } = event.target;

    console.log("handleSearchChange <- ", name, value);
    setSearch((prev) => {
      if (name === "type") {
        return {
          keyword: prev.keyword,
          year: prev.year,
          type: value,
        };
      } else if (name === "keyword") {
        return {
          keyword: value,
          year: prev.year,
          type: prev.type,
        };
      }
    });
    console.log("handleSearchChange ->", search);
    getMovies();
  }

  function handleNextPage() {
    setPage(page + 1);
    getMovies();
  }

  useEffect(() => {
    getMovies(); //fetch data from api
  }, []);

  return (
    <div className="homepage">
      <Container>
        <Row>
          <SearchBar
            className="search-bar"
            search={search}
            onChangeYear={handleChangeYear}
            onChangeSearch={handleChangeSearch}
          />
        </Row>
        <Row>
          {movies.Response === "True" ? (
            <SearchResult
              className="search-result"
              yearRange={search.year}
              type={search.type}
              result={movies}
            />
          ) : (
            <p>No Movie found</p>
          )}
          <a onClick={handleNextPage}> Next </a>
        </Row>
      </Container>
    </div>
  );
}
