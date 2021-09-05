import React from "react";
import "./LoadMore.styles.scss";
import { Button } from "react-bootstrap";

export default function LoadMore(props) {
  const { loadMoreFn, hasMore } = props;
  return (
    <div className="load-more-btn d-grid gap-2">
      <Button variant="secondary" onClick={loadMoreFn}>
        Click to Load More...
      </Button>
    </div>
  );
}
