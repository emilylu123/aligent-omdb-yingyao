import React, { useEffect, useState } from "react";
import "./MovieDetail.styles.scss";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

export default function MovieDetail(props) {
  console.log("props.detail", props.info);
  const { Rated, Runtime, Actors, Genre, Plot, Ratings } = props.info;

  const { Title, Type, Year, Poster } = props.basic;
  const [watchList, setWatchList] = useState(false);
  // const [collection, setCollection] = useState([]);

  function toggleWatchList() {
    setWatchList((prevValue) => {
      return !prevValue;
    });
    // todo: handle add to watch list array and display later on WatchListPage
    // const item = props.detail;
    // if (watchList) {
    //   setCollection((prevValue) => {
    //     return [...prevValue, props.detail];
    //   });
    //   console.log(collection);
    // }
  }

  return (
    <div className="selected">
      <img src={Poster} alt={Title} />
      <p> {Title}</p>
      <p> {Year}</p>
      <p> {Type}</p>
      <p>{Rated}</p>
      <p>{Runtime}</p>
      <p>{Actors}</p>
      <p>{Genre}</p>
      <p>{Plot}</p>

      <button value={watchList} onClick={toggleWatchList}>
        {watchList ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        Watchlist
      </button>
    </div>
  );
}
