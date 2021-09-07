import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.styles.scss";
import UseFetch from "../../effects/UseFetch/UseFetch.effect";

export default function HomePage() {
  // movies - search results fetching from the omdb API
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  // search - search conditions set from search-bar
  // set default search value
  // page - add to URL to load more search results from the omdb API
  const displayCurrentYear = new Date().getFullYear();
  const [search, setSearch] = useState({
    keyword: "star",
    year: [1970, displayCurrentYear],
    type: "", // default type '' - any
    page: 1,
  });
  const [clearTag, setClearTag] = useState(false);

  // omdb API_KEY and URL
  const API_KEY = "866364e";
  const listURL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.keyword}&type=${search.type}&page=${search.page}`;

  useEffect(() => {
    console.log(">> (L) useEffect fetch movie basic");
    getMovies(); //fetch data from API
    return () => {
      // clean up
      setClearTag(false);
    };
  }, [search]);

  // async function to fetch movie list(array) from OMDB API
  // each movie is shown as {Poster,Title,Type,Year,imdbID}
  async function getMovies() {
    try {
      const response = await fetch(listURL);
      const data = await response.json();
      console.log("Get Movie data from omdb API>>", listURL, data);
      if (data.Response === "True") {
        setTotalResults(data.totalResults);
        if (clearTag) {
          console.log("Clear movies");
          setMovies([]);
        }

        if (movies.length === 0) {
          console.log("1st time set movies []", data.Response);
          setMovies(data.Search);
        } else {
          // handleResult(data);
          setMovies((prev) => {
            return prev.concat(data.Search);
          });
        }

        console.log("set clear false");
        setClearTag(false);
      }
    } catch (e) {
      console.error(e.toString);
    }
  }

  // handle setMovies array - clear or concat to array
  // function handleResult(result) {
  //   if (movies.length >= totalResults) {
  //     setHasMore(false);
  //   }
  //   setMovies((prev) => {
  //     return prev.concat(result.Search);
  //   });
  // }

  // clear search keyword
  const handleClearKeyword = () => {
    setSearch((prev) => {
      return {
        ...prev,
        keyword: "",
        page: 1,
      };
    });
    // add clear tag to reset movies
    console.log("clear keyword");
    setClearTag(true);
    // setMovies([]);
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
    // setMovies([]);
    const { name } = event.target;
    let value = event.target.value;
    // replace space to '+' for keyword
    if (name === "keyword") {
      value = value.replace(/\s+/g, "+").toLowerCase();
    }
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
            onClearKeyword={handleClearKeyword}
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
