import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Country from "../Statistics/Country";
import Topics from "../Statistics/Topics";
import Box from "@material-ui/core/Box";
import "../CSS/Drawer.css";
import CountryFunc from "./CountryFunc";


const useStyles = makeStyles((theme) => ({
	root: {},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "100%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}));

export default function ControlledAccordions(state) {
	console.log("country seearch " + state.search)
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	// console.log("accor state" + state.search);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			<Accordion
				expanded={expanded === "panel1"}
				onChange={handleChange("panel1")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading}>
						Country Statistics
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box component="span" className="chart" style={{ width: "100%" }}>
						<Country className="graph" search={state.search}></Country>
					</Box>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === "panel2"}
				onChange={handleChange("panel2")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2bh-content"
					id="panel2bh-header"
				>
					<Typography className={classes.heading}>Topic Statistics</Typography>
				</AccordionSummary>
				<AccordionDetails>
				<Box component="span" className="chart" style={{ width: "100%" }}>
					<Topics className="graph" search={state.search}></Topics>
				</Box>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
