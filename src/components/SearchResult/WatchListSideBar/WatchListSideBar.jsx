import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "./WatchListSideBar.styles.scss";
import MovieItem from "../MovieList/MovieItem/MovieItem";

export default function WatchListSideBar({ myCollection, placement }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function handleSelect(id) {
    console.log("TODO: handle select in WatchListSideBar", id);
  }
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="myWatchListSideBarBtn"
      >
        My WatchList
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My WatchList</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {myCollection ? (
            myCollection.map((item) => (
              <MovieItem
                key={item.imdbID}
                id={item.imdbID}
                title={item.Title}
                year={item.Year}
                imgURL={item.Poster}
                onClick={handleSelect}
              />
            ))
          ) : (
            <p>Your Watch is Empty</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
