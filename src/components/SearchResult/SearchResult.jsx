import React, { useState } from "react";
import "./SearchResult.styles.scss";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieItem from "./MovieItem/MovieItem";
import { Grid } from "@material-ui/core";

export default function SearchResult(props) {
  console.log("MovieList", props.result, props.detailInfo);
  const {
    yearRange: [startY, endY],
    type,
    result: { Search, Response, totalResults },
    detailInfo,
  } = props;

  const [selectId, setSelectId] = useState(0);

  function handleSelect(id) {
    setSelectId(id);
    console.log("select ID", selectId);
  }

  return (
    <div className="">
      <Grid container>
        <Grid item xs={3}>
          <p>{totalResults} RESULTS</p>
          {Search.map(({ Title, Year, Type, Poster, imdbID }, index) => {
            if (Year > startY && Year < endY) {
              return (
                <MovieItem
                  key={index}
                  id={index}
                  imdbID={imdbID}
                  title={Title}
                  year={Year}
                  type={Type}
                  imgURL={Poster}
                  onClick={handleSelect}
                />
              );
            }
          })}
        </Grid>
        <Grid item xs={8}>
          <MovieDetail detail={Search[selectId]} />
        </Grid>
      </Grid>
    </div>
  );
}
