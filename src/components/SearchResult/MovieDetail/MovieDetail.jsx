import React, { useState } from "react";
import "./MovieDetail.styles.scss";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

export default function MovieDetail(props) {
  const [watchList, setWatchList] = useState(false);
  const { Title, Year, Type, Poster, imdbID } = props.detail;
  const [collection, setCollection] = useState([]);
  // console.log("Movie Detail", props.detail);

  function toggleWatchList() {
    setWatchList((prevValue) => {
      return !prevValue;
    });
    // todo: handle add to watch list array and dispay later on WatchListPage
    const item = props.detail;
    if (watchList) {
      setCollection((prevValue) => {
        return [...prevValue, props.detail];
      });
      console.log(collection);
    }
  }

  return (
    <div className="selected">
      <img src={Poster} alt={Title} />
      <p> {Title}</p>
      <p>{imdbID}</p>
      <p>MovieDetail</p>
      <p> {Year}</p>
      <p> {Type}</p>

      <button value={watchList} onClick={toggleWatchList}>
        {watchList ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        Watchlist
      </button>
    </div>
  );
}
