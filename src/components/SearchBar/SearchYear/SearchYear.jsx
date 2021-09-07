import React from "react";
import "./SearchYear.styles.scss";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Row, Col, Container } from "react-bootstrap";

// custom slider style and color
const RangeSlider = withStyles({
  root: {
    color: "grey",
    height: 6,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function SelectYear(props) {
  const YEAR_END = new Date().getFullYear(); // dynamically set as current year
  const [yearRange, setYearRange] = React.useState([1970, YEAR_END]);

  // change yearRange with sliders
  function handleChangeRange(e, data) {
    setYearRange(data);
  }

  return (
    <Container className="search-year">
      <div className="d-none d-md-block">YEAR</div>
      <Row>
        <Col xs className="year-title">
          1970
        </Col>
        <Col xs={8}>
          <RangeSlider
            name="year"
            value={yearRange}
            min={1970}
            max={YEAR_END}
            valueLabelDisplay="auto"
            defaultValue={[1970, YEAR_END]}
            // fired when the slider's value changed
            onChange={handleChangeRange}
            // callback function fired when mouseup it triggered
            onChangeCommitted={(e) => {
              props.onChange(yearRange);
            }}
            getAriaLabel={(index) => (index === 0 ? "Start" : "End")}
          />
        </Col>
        <Col xs className="year-title">
          {YEAR_END}
        </Col>
      </Row>
    </Container>
  );
}
