import React from "react";
import "./LoadMore.styles.scss";
import { Button } from "react-bootstrap";
export default function LoadMore(props) {
  const { isLoading, loadMoreFn } = props;
  return (
    <div className="load-more-btn d-grid gap-2">
      <Button
        variant="secondary"
        disabled={isLoading}
        onClick={!isLoading ? loadMoreFn : null}
        onClick={loadMoreFn}
      >
        {isLoading ? "Loading…" : "Click to Load More..."}
      </Button>
    </div>
  );
}
