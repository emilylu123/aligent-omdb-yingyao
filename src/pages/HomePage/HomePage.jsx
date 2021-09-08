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
  const [tooltip, setTooltip] = useState("Please enter Keyword");

  // omdb API_KEY and URL
  const API_KEY = "866364e";
  const listURL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.keyword}&type=${search.type}&page=${search.page}`;

  useEffect(() => {
    console.log(">> (L) useEffect fetch movie basic");
    getMovies(); //fetch data from API
    return () => {
      // clean up lear tag
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
        setTooltip(""); // clear tooltip error message
        setTotalResults(data.totalResults); //update total result counts
        if (clearTag) {
          console.log("Clear movies");
          setMovies([]);
        }

        if (movies.length === 0) {
          setMovies(data.Search);
        } else {
          // setMovies array - concat new data to movies array
          setMovies((prev) => {
            return prev.concat(data.Search);
          });
        }
        setClearTag(false);
      } else {
        data.Error === "Incorrect IMDb ID."
          ? setTooltip("Please Enter Keyword to Search Movies")
          : setTooltip(data.Error);
      }
    } catch (e) {
      console.error("Error in getMovies()", e.toString);
    }
  }

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
    // clear movies
    setClearTag(true);
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
            tooltip={tooltip}
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
                tooltip={tooltip}
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
