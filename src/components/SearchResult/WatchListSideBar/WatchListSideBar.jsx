import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "./WatchListSideBar.styles.scss";

export default function WatchListSideBar(props) {
  const { myWatchListCollection, placement } = props; 

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
          {myWatchListCollection ? (
            myWatchListCollection.map((data, index) => {
              return <p key={data}>{data}</p>;
            })
          ) : (
            <p>Your Watch is Empty</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
