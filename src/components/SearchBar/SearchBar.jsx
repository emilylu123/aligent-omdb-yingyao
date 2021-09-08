import React, { useState } from "react";
import "./SearchBar.styles.scss";
import SearchYear from "./SearchYear/SearchYear";
import SearchType from "./SearchType/SearchType";
import { BsSearch } from "react-icons/bs";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { Tooltip } from "@material-ui/core"; // use Tooltip to show error message on input box

function SearchBar({
  onClearKeyword,
  onChangeYear,
  onChangeType,
  onChangeSearch,
  tooltip,
  search: { keyword, year, type },
}) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const handleOpen = () => {
    setOpenTooltip(true);
  };
  const handleClose = () => {
    setOpenTooltip(false);
  };
  return (
    <Container className="search-bar-container">
      <Row>
        {/* KEYWORD - search input box */}
        <Col xs={12} md={3} lg={4} xl={5}>
          <InputGroup className="search-input-block" size="sm">
            {/* search icon */}
            <InputGroup.Text>
              <BsSearch id="search-icon" />
            </InputGroup.Text>
            <Tooltip
              open={openTooltip}
              onClose={handleClose}
              onOpen={handleOpen}
              title={tooltip}
              placement="bottom-start"
              arrow
            >
              <FormControl
                placeholder="Search Movies"
                aria-label="keyword"
                aria-describedby="basic-addon1"
                name="keyword"
                id="search-keyword-input"
                type="text"
                value={keyword}
                onClick={onClearKeyword}
                onChange={onChangeSearch}
                autoComplete="off"
              />
            </Tooltip>
          </InputGroup>
        </Col>

        {/* YEAR - change search year range with Material UI slider */}
        <Col className="search-year-block d-none d-lg-block" xs={12} lg xl>
          <SearchYear name="year" value={year} onChange={onChangeYear} />
        </Col>

        {/* TYPE - change search type */}
        <Col
          className="search-type-block"
          xs={12}
          md="auto"
          lg="auto"
          xl="auto"
        >
          <SearchType name="type" value={type} onChange={onChangeType} />
        </Col>
      </Row>
    </Container>
  );
}

export default SearchBar;
