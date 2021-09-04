import React from "react";
import "./SearchType.styles.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Form } from "react-bootstrap";
import { useTheme } from "@material-ui/core/styles";

export default function SelectType(props) {
  return (
    <div className="search-type">
      {/* <Form>
        <Form.Label as="legend" column sm={2}>
          TYPE
        </Form.Label>
        <div
          key={`inline-radio`}
          className="mb-3"
          name="type"
          defaultValue=""
          onChange={props.onChange}
        >
          <Form.Check inline label="Any" value="" name="type" type="radio" />
          <Form.Check
            inline
            name="type"
            label="Movies"
            value="movie"
            type="radio"
          />
          <Form.Check
            inline
            name="type"
            label="Series"
            value="series"
            type="radio"
          />
          <Form.Check
            inline
            name="type"
            label="Episodes"
            value="episode"
            type="radio"
          />
        </div>
      </Form> */}
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
    </div>
  );
}
