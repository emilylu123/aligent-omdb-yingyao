import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  // movies - search results fetching from the omdb API
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  // search - search conditions set from search-bar
  const [search, setSearch] = useState({
    keyword: "star",

    year: [1970, 2021],
    type: "",
  });
  // page - add to URL to load more search results from the omdb API
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const API_KEY = "866364e";
  const listURL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search.keyword}&type=${search.type}&page=${page}`;
  const detailURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${search.keyword}`;

  // async function to fetch movie list(array) from OMDB API
  // each movie is shown as {Poster,Title,Type,Year,imdbID}
  const getMovies = async () => {
    try {
      const response = await fetch(listURL);
      const data = await response.json();
      console.log("Get Movie data -from omdb API>>", data);
      if (data.Response) {
        if (movies.length === 0) {
          setMovies(data.Search);
          setTotalResults(data.totalResults);
        } else {
          handleResult(data);
        }
      }
    } catch (e) {
      console.error(e.toString);
    }
  };

  function loadMore() {
    setPage(page + 1);
    console.log("Loading More movies... Page:", page);
    getMovies();
  }

  function handleResult(result) {
    console.log(
      "in handleResult",
      result.Search,
      result.totalResults,
      result.Response
    );
    setTotalResults(result.totalResults);

    console.log("load more movies", movies.length);

    setMovies((prev) => {
      return prev.concat(result.Search);
    });
  }

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
          {/* render SearchResult if movies is not empty */}
          <p>{movies.length}</p>
          {movies.length ? (
            <SearchResult
              className="search-result"
              movies={movies}
              totalResults={totalResults}
              searchYearRange={search.year}
              searchType={search.type}
              loadMoreFn={loadMore}
              isLoadingMore={isLoadingMore}
            />
          ) : (
            <p>No Movie found</p>
          )}
        </Row>
      </Container>
    </div>
  );
}
