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
      <img src={Poster} alt={Title} className="poster" />
      <button value={watchList} onClick={toggleWatchList} className="watchlist">
        {watchList ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        Watchlist
      </button>
      <h2 className="title"> {Title}</h2>
      <span className="rated">{Rated}</span>
      <span className="year">{`  ${Year} · ${Genre} · ${Runtime}`}</span>
      <div>{Actors}</div>
      <hr />
      <div>{Plot}</div>
      <hr />
      {Ratings ? (
        <div>
          <span>{Ratings[0].Value}</span>
          <span>{Ratings[0].Source}</span>
          <span>{Ratings[1].Value}</span>
          <span>{Ratings[1].Source}</span>
        </div>
      ) : null}
    </div>
  );
}
