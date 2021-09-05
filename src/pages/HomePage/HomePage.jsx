import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.styles.scss";

export default function HomePage() {
  // movies - search results fetching from the omdb API
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  // search - search conditions set from search-bar
  const displayYear = new Date().getFullYear();
  const [clearKeyword, setClearKeyWord] = useState(false);

  // set default search value
  const [search, setSearch] = useState({
    keyword: "star",
    year: [1970, displayYear],
    type: "", // default type '' - any
    page: 1,
  });

  // page - add to URL to load more search results from the omdb API
  // const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // omdb API_KEY and URL
  const API_KEY = "866364e";
  const listURL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search.keyword}&type=${search.type}&page=${search.page}`;

  // async function to fetch movie list(array) from OMDB API
  // each movie is shown as {Poster,Title,Type,Year,imdbID}
  async function getMovies() {
    try {
      const response = await fetch(listURL);
      const data = await response.json();
      console.log("Get Movie data -from omdb API>>", data);
      if (data.Response === "True") {
        if (!movies.length && !clearKeyword) {
          console.log("1st time set movies", data.Response);
          setMovies(data.Search);
          setTotalResults(data.totalResults);
        } else {
          handleResult(data);
        }
      }
    } catch (e) {
      console.error(e.toString);
    }
  }

  function loadMoreMovies() {
    // setPage((prev) => {
    //   return prev + 1;
    // });
    setSearch((prev) => {
      return {
        keyword: prev.keyword,
        year: prev.year,
        type: prev.type,
        page: prev.page + 1,
      };
    });

    console.log("Loading More movies... Page:", search.page);
    getMovies();
  }

  function handleResult(result) {
    // console.log(
    //   "in handleResult",
    //   result.Search,
    //   result.totalResults,
    //   result.Response
    // );
    // console.log("load more movies", movies.length);//
    setTotalResults(result.totalResults);
    if (movies.length >= totalResults) {
      setHasMore(false);
    }
    setMovies((prev) => {
      return prev.concat(result.Search);
    });
  }

  function handleKeyword() {
    setClearKeyWord(true);
    setMovies([]);
    setSearch((prev) => {
      return {
        keyword: "",
        year: [1970, displayYear],
        type: "", // default type '' - any
        page: 1,
      };
    });
    getMovies();
    console.log("reset search keyword");
  }

  function handleChangeYear(value) {
    setSearch((prev) => {
      return {
        keyword: prev.keyword,
        year: value,
        type: prev.type,
        page: prev.page,
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
        page: prev.page,
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
          page: prev.page,
        };
      } else if (name === "keyword") {
        setMovies([]);
        return {
          keyword: value,
          year: prev.year,
          type: "",
          page: 1,
        };
      }
    });
    console.log("handleSearchChange ->", search);
    getMovies();
  }

  useEffect(() => {
    getMovies(); //fetch data from API
  }, []);

  return (
    <div className="homepage">
      <Container>
        <Row>
          <SearchBar
            className="search-bar"
            search={search}
            onChangeKeyword={handleKeyword}
            onChangeYear={handleChangeYear}
            onChangeSearch={handleChangeSearch}
          />
        </Row>
        <Row>
          {/* render SearchResult if movies is not empty */}
          <Col>
            {movies.length
              ? console.log("movies.length", movies.length, movies)
              : console.log("empty")}
            {movies.length ? (
              <SearchResult
                className="search-result"
                movies={movies}
                totalResults={totalResults}
                searchYearRange={search.year}
                searchType={search.type}
                loadMoreMovies={loadMoreMovies}
                hasMore={hasMore}
              />
            ) : (
              <div className="empty-keyword">
                <h1>Woops...</h1>
                <h3>Please Enter KeyWord to Search Movie</h3>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
