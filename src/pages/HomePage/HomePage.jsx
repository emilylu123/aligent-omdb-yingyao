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
  const displayCurrentYear = new Date().getFullYear();
  const [clearTag, setClearTag] = useState(false);

  // set default search value
  const [search, setSearch] = useState({
    keyword: "star",
    year: [1970, displayCurrentYear],
    type: "", // default type '' - any
    page: 1,
  });

  // page - add to URL to load more search results from the omdb API
  const [hasMore, setHasMore] = useState(true);

  // omdb API_KEY and URL
  const API_KEY = "866364e";
  const listURL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search.keyword}&type=${search.type}&page=${search.page}`;

  useEffect(() => {
    getMovies(); //fetch data from API
  }, [search]);

  // async function to fetch movie list(array) from OMDB API
  // each movie is shown as {Poster,Title,Type,Year,imdbID}
  async function getMovies() {
    try {
      const response = await fetch(listURL);
      const data = await response.json();
      console.log("Get Movie data -from omdb API>>", listURL, data);
      if (data.Response === "True") {
        if (clearTag) {
          console.log("Clear movies");
          setMovies([]);
        }

        if (movies.length === 0) {
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

  function handleResult(result) {
    setTotalResults(result.totalResults);
    if (movies.length >= totalResults) {
      setHasMore(false);
    }
    setMovies((prev) => {
      return prev.concat(result.Search);
    });
  }

  const handleKeyword = () => {
    setSearch((prev) => {
      return {
        ...prev,
        keyword: "",
        page: 1,
      };
    });
    // add clear tag to reset movies
    setClearTag(true);
  };

  // filter movie-item display in the year range
  function handleChangeYear(value) {
    setSearch((prev) => {
      return {
        ...prev,
        year: value,
      };
    });
  }

  // change keyword and type and rerender API call
  function handleChangeSearch(event) {
    const { name, value } = event.target;
    console.log("handleSearchChange <- ", name, value);
    setSearch((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setClearTag(true);
    // setMovies([]);
  }

  function loadMoreMovies() {
    setSearch((prev) => {
      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  }

  return (
    <div className="homepage">
      <Container>
        <Row>
          <SearchBar
            className="search-bar"
            search={search}
            onClearKeyword={handleKeyword}
            onChangeYear={handleChangeYear}
            onChangeType={handleChangeSearch}
            onChangeSearch={handleChangeSearch}
          />
        </Row>
        <Row>
          {/* render SearchResult if movies is not empty */}
          <Col>
            {movies.length ? (
              <SearchResult
                className="search-result"
                movies={movies}
                search={search}
                totalResults={totalResults}
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
