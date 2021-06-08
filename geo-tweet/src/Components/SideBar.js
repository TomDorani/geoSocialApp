import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "../CSS/Drawer.css";
import Button from "@material-ui/core/Button";
import Accordion from "./Accordion";
import SentiFilter from "./sentifilter";
import AboutUs from "./AboutUs";

const SideBar = (props) => {
	//console.log("sidebar props", props);
	const [searchText, setSearchText] = useState("");

	const theme = useTheme();

	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: 1100,
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(3, 4, 3),
		},
		headline: {
			alignSelf: "center",
		},
	}));
	const classes = useStyles();

	const searchChange = (event) => {
		setSearchText(event.target.value);
	};

	const checkSearch = (event) => {
		if (searchText === "" || searchText == null) {
			props.setSearch([]);
		} else {
			let words = searchText.split(" ");
			//console.log("key,words:", words);
			props.setSearch(words);
		}
		setSearchText("");
	};

	return (
		<Drawer
			BackdropProps={{ invisible: true }}
			anchor="left"
			open={props.open}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className="DrawerHeader">
				<Typography
					variant="h6"
					noWrap
					style={{ padding: "20px", marginInlineEnd: "35%" }}
				>
					{"Geo Tweet"}
				</Typography>

				<div className="DrawerButton">
					<IconButton onClick={props.closeDrawer} style={{ color: "white" }}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
			</div>
			<Divider />
			<List>
				<Container maxWidth="sm">
					<Grid
						className="layer"
						container
						direction="column"
						justify="center"
						alignItems="flex-start"
					>
						<Grid>
							<TextField
								id="standard-basic"
								label="KeyWords"
								value={searchText}
								onChange={searchChange}
							/>
							<Button
								className="searchbtn"
								variant="contained"
								color="primary"
								onClick={(e) => {
									checkSearch(e);
								}}
							>
								Search
							</Button>
						</Grid>
						<FormGroup className="switch">
							<FormControlLabel
								className="heatMapSwitch"
								control={
									<Switch
										checked={props.heatMap}
										onChange={props.heatMapChange}
										name="heatMap"
										color="primary"
									/>
								}
								label="Heatmap Layer"
							/>
							<FormControlLabel
								className="SentiSwitch"
								control={
									<SentiFilter
										senti={props.senti}
										sentiChange={props.setSenti}
									/>
								}
								// label="Heatmap Layer"
							/>
						</FormGroup>
					</Grid>
				</Container>
			</List>
			<Divider />
			<List>
				<Accordion search={props.search}></Accordion>
				<AboutUs />
			</List>
		</Drawer>
	);
};

export default SideBar;
