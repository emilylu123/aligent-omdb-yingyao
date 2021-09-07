import React from "react";
import "./SearchType.styles.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "lightgray",
    height: 45,
    padding: "-2px 6px",
  },
});

export default function SelectType(props) {
  const type = props.value;
  const classes = useStyles();
  return (
    <div className="search-type">
      <FormControl component="fieldset" className="search-type">
        <div className="d-none d-md-block">TYPE {type}</div>
        <RadioGroup row name="type" defaultValue="" onChange={props.onChange}>
          <FormControlLabel
            value=""
            control={<Radio className={classes.root} color="secondary" />}
            label="Any"
          />
          <FormControlLabel
            value="movie"
            control={<Radio className={classes.root} />}
            label="Movies"
          />
          <FormControlLabel
            value="series"
            control={<Radio className={classes.root} />}
            label="Series"
          />
          <FormControlLabel
            value="episode"
            control={<Radio className={classes.root} />}
            label="Episodes"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
