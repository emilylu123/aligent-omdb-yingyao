import React from "react";
import "./SearchBar.styles.scss";
import SearchYear from "./SearchYear/SearchYear";
import SearchType from "./SearchType/SearchType";

import { BsSearch } from "react-icons/bs";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";

function SearchBar(props) {
  const { keyword, year, type } = props.search;

  return (
    <Container className="search-bar">
      <Row>
        <Col xs={4}>
          <InputGroup className="search-input" size="lg">
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Search Movies"
              aria-label="keyword"
              aria-describedby="basic-addon1"
              name="keyword"
              id="search-input-box"
              type="text"
              value={keyword}
              onChange={props.onChangeSearch}
            />
          </InputGroup>
        </Col>
        <Col className="search-year" xs="auto">
          <SearchYear name="year" value={year} onChange={props.onChangeYear} />
        </Col>
        <Col className="search-type" xs="auto">
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
