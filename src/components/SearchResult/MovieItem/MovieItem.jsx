import React from "react";
import "./MovieItem.styles.scss";
import { Grid } from "@material-ui/core";

export default function MovieItem(props) {
  const defaultPoster =
    "https://allaboutvanya.files.wordpress.com/2012/02/ilovemovies2.jpg";
  const { title, year, imgURL, id } = props;

  return (
    <div onClick={props.onClick}>
      <Grid container className="movie-item">
        <Grid item xs={4}>
          <img src={imgURL !== "N/A" ? imgURL : defaultPoster} alt="Poster" />
        </Grid>
        <Grid item xs={8}>
          <h3>{title}</h3>
          <p>{year}</p>
        </Grid>
      </Grid>
    </div>
  );
}
