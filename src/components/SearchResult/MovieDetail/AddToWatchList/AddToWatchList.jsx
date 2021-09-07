import React from "react";
import "./AddToWatchList.styles.scss";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

export default function AddToWatchList({ onClick, onWatchList }) {
  return (
    <button onClick={onClick} className="addWatchlistBtn">
      {onWatchList ? (
        <BookmarkIcon className="bookmark" />
      ) : (
        <BookmarkBorderIcon className="bookmark" />
      )}
      <span id="watchlist-btn-text">Watchlist</span>
    </button>
  );
}
