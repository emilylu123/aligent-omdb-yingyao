import React from "react";
import "./SearchType.styles.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function SelectType() {
  function handleChange(event) {
    const selectedType = event.target.value;
    console.log("selectedType:", selectedType);
  }

  return (
    <FormControl component="fieldset" className="search-type">
      TYPE
      <RadioGroup
        row
        aria-label="type"
        name="type"
        defaultValue="any"
        onChange={handleChange}
      >
        <FormControlLabel
          value="any"
          control={<Radio color="secondary" />}
          label="Any"
        />
        <FormControlLabel
          value="movies"
          control={<Radio color="secondary" />}
          label="Movies"
        />
        <FormControlLabel
          value="series"
          control={<Radio color="secondary" />}
          label="Series"
        />
        <FormControlLabel
          value="episodes"
          control={<Radio color="secondary" />}
          label="Episodes"
        />
      </RadioGroup>
    </FormControl>
  );
}
