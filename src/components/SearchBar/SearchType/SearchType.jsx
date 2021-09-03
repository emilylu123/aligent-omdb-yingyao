import React, { useState } from "react";
import "./SearchType.styles.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function SelectType(props) {
  return (
    <FormControl component="fieldset" className="search-type">
      TYPE
      <RadioGroup row name="type" defaultValue="" onChange={props.onChange}>
        <FormControlLabel
          value=""
          control={<Radio color="secondary" />}
          label="Any"
        />
        <FormControlLabel
          value="movie"
          control={<Radio color="secondary" />}
          label="Movies"
        />
        <FormControlLabel
          value="series"
          control={<Radio color="secondary" />}
          label="Series"
        />
        <FormControlLabel
          value="episode"
          control={<Radio color="secondary" />}
          label="Episodes"
        />
      </RadioGroup>
    </FormControl>
  );
}
