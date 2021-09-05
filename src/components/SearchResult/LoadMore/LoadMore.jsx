import React from "react";
import "./LoadMore.styles.scss";

export default function LoadMore(props) {
  return (
    <div className="load-more">
      {props.isLoadingMore ? (
        <span>Loading...</span>
      ) : (
        <span onClick={props.loadMoreFn}>Load More...</span>
      )}
    </div>
  );
}
