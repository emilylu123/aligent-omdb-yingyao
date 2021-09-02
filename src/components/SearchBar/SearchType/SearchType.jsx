import React, { useState } from "react";
import "./SearchType.styles.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function SelectType() {
  const [type, setType] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
    console.log("Type:", type);
  };

  return (
    <FormControl
      component="fieldset"
      className="search-type"
      // onChange={handleTypeChange}
    >
      TYPE
      <RadioGroup
        row
        aria-label="type"
        name="type"
        defaultValue="any"
        onChange={handleTypeChange}
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
