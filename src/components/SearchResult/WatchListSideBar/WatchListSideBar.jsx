import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "./WatchListSideBar.styles.scss";

export default function WatchListSideBar(props) {
  const { listData, placement } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          {listData ? (
            listData.map((data, index) => {
              return <p key={index}>{data}</p>;
            })
          ) : (
            <p>Empty</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
