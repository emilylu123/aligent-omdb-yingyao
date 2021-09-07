import React from "react";
import "./MovieList.styles.scss";
import LoadMore from "../LoadMore/LoadMore";

import InfiniteScroll from "react-infinite-scroll-component";
import MovieItem from "./MovieItem/MovieItem";

export default function MovieList(props) {
  const {
    search: {
      year: [startY, endY],
      type,
      keyword,
    },
    totalResults,
    movies,
    onSelect,
    loadMoreMovies,
    hasMore,
    selectId,
  } = props;

  return (
    <>
      <div className="total-result-counts grey-font d-none d-lg-block">
        <p>
          {`SEARCH ${
            type ? type.toUpperCase() : "ANY"
          }: "${keyword}" - YEAR: ${startY} - ${endY} `}
        </p>
        <p>{movies.length ? ` ${totalResults}  RESULTS` : ""}</p>
      </div>
      <div>
        <InfiniteScroll
          dataLength={movies.length} //This is important field to render the next data
          next={loadMoreMovies} // trigger loadMore function
          onClick={loadMoreMovies}
          height={750} // trigger loading at this height
          hasMore={hasMore}
          loader={<h5>Scroll to Loading More...</h5>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {movies.map(({ Title, Year, Type, Poster, imdbID }, index) => {
            if (Year > startY && Year < endY) {
              return (
                <MovieItem
                  className={
                    selectId === index ? "movie-item  selected" : "movie-item"
                  } // change background color
                  key={index}
                  id={index}
                  title={Title}
                  year={Year}
                  type={Type}
                  imgURL={Poster}
                  onClick={onSelect}
                />
              );
            } else {
              return null;
            }
          })}
        </InfiniteScroll>
      </div>
      {movies.length < totalResults ? (
        <LoadMore loadMoreFn={loadMoreMovies} hasMore={hasMore} />
      ) : (
        <div></div>
      )}
    </>
  );
}
