import React from "react";
import "./SearchBar.styles.scss";
import SearchYear from "./SearchYear/SearchYear";
import SearchType from "./SearchType/SearchType";
import { BsSearch } from "react-icons/bs";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { TextField, Grid } from "@material-ui/core";

function SearchBar(props) {
  const { keyword, year, type } = props.search;

  return (
    <Container className="search-bar-container">
      <Row>
        {/* KEYWORD - search input box */}
        <Col xs>
          <TextField
            name="keyword"
            id="search-input"
            type="text"
            placeholder="Search Movies"
            onClick={props.onChangeKeyword}
            onChange={props.onChangeSearch}
          />
          <InputGroup className="search-input-block" size="lg">
            {/* search icon */}
            <InputGroup.Text>
              <BsSearch id="search-icon" />
            </InputGroup.Text>
            <FormControl
              placeholder="Search Movies"
              aria-label="keyword"
              aria-describedby="basic-addon1"
              name="keyword"
              id="search-keyword-input"
              type="text"
              value={keyword}
              onClick={props.onChangeKeyword}
              onChange={props.onChangeSearch}
            />
          </InputGroup>
        </Col>

        {/* YEAR - change search year range with Material UI slider */}
        <Col className="search-year-block" xs="auto">
          <SearchYear name="year" value={year} onChange={props.onChangeYear} />
        </Col>

        {/* TYPE - change search type */}
        <Col className="search-type-block" xs="auto">
          <SearchType
            name="type"
            value={type}
            onChange={props.onChangeSearch}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SearchBar;
