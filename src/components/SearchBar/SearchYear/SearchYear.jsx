import React from "react";
import "./SearchYear.styles.scss";
import { Grid, Slider, Typography } from "@material-ui/core";

export default function SelectYear(props) {
  const YEAR_END = new Date().getFullYear(); // dynamically set as current year
  const [yearRange, setYearRange] = React.useState([1970, YEAR_END]);

  // change yearRange with sliders
  function handleChangeRange(e, data) {
    setYearRange(data);
  }

  return (
    <div className="search-year">
      <Typography id="year-slider" gutterBottom>
        YEAR
      </Typography>
      <Grid container spacing={2}>
        <Grid item>1970</Grid>
        <Grid item xs>
          <Slider
            color="secondary"
            name="year"
            value={yearRange}
            min={1970}
            max={YEAR_END}
            // fired when the slider's value changed
            onChange={handleChangeRange}
            // callback function fired when mouseup it triggered
            onChangeCommitted={(e) => {
              props.onChange(yearRange);
            }}
            valueLabelDisplay="auto"
            getAriaLabel={(index) => (index === 0 ? "Start" : "End")}
          />
        </Grid>
        <Grid item>{YEAR_END}</Grid>
      </Grid>
    </div>
  );
}
