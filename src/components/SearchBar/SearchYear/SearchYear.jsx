import React from "react";
import "./SearchYear.styles.scss";
import { Grid, Slider, Typography } from "@material-ui/core";

export default function SelectYear(props) {
  const [value, setValue] = React.useState([1970, 2021]);

  function handleChange(e, data) {
    setValue(data);
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
            // defaultValue={[1970, 2021]}
            onChangeCommitted={(e) => {
              console.log("onChangeCommitted", value);
              props.onChange(value);
            }}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaLabel={(index) => (index === 0 ? "Start" : "End")}
          />
        </Grid>
        <Grid item>2021</Grid>
      </Grid>
    </div>
  );
}
