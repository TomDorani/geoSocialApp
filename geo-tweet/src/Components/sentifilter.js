import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

export default function SentiFilter(props) {
	// console.log("props", props);
	const classes = useStyles();
	const [currstate, setCurrstate] = React.useState(props.senti);

	const handleChange = (event, newfilter) => {
		setCurrstate(newfilter);
		props.sentiChange(newfilter);
		// console.log(event);
		// console.log(newfilter);
	};

	return (
		<div className={classes.root}>
			<ToggleButtonGroup value={currstate} exclusive onChange={handleChange}>
				<ToggleButton value="ALL" id="all-btn">
					All
				</ToggleButton>
				<ToggleButton value="POSITIVE" id="positive-btn">
					Positive
				</ToggleButton>
				<ToggleButton value="NEGATIVE" id="negative-btn">
					Negative
				</ToggleButton>
				<ToggleButton value="NEUTRAL" id="natural-btn">
					Natural
				</ToggleButton>
				<ToggleButton value="MIXED" id="mixed-btn">
					Mixed
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
}
