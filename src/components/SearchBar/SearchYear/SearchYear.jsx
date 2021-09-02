import React from "react";
import "./SearchYear.styles.scss";
import { Grid, Slider, Typography } from "@material-ui/core";

export default function SelectYear() {
  const [value, setValue] = React.useState([1970, 2021]);

  const handleChange = (event, newValue) => {
    const year = event.target.value;
    console.log("YEAR:", year);
    // console.log(start, end);
    console.log("T", event.target);
    console.log("v", event.target.value);
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value} Year`;
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
            value={value}
            min={1970}
            max={2021}
            defaultValue={[1970, 2021]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            getAriaLabel={(index) => (index === 0 ? "Start Year" : "End Year")}
          />
        </Grid>
        <Grid item>2015</Grid>
      </Grid>
    </div>
  );
}
