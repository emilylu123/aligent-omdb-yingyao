import React from "react";
import "./MovieDetail.styles.scss";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

export default function MovieDetail(props) {
  console.log("DDD", props);
  const { Title, Year, Type, Poster, imdbID } = props.detail;
  console.log("Movie Detail", props.detail);
  return (
    <div className="selected">
      <p>MovieDetail</p>
      <p> {Title}</p>
      <p> {Year}</p>
      <p> {Type}</p>
      <p>{imdbID}</p>
      <img src={Poster} />
      <BookmarkIcon />
      <BookmarkBorderIcon />
    </div>
  );
}
