import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "../CSS/Drawer.css";
import Button from "@material-ui/core/Button";
import Accordion from "./Accordion";
import SentiFilter from "./sentifilter";
import AboutUs from "./AboutUs";
import UserGuide from "./UserGuide";

import Box from "@material-ui/core/Box";

const SideBar = (props) => {
	//console.log("sidebar props", props);
	const [searchText, setSearchText] = useState("");

	const theme = useTheme();

	const useStyles = makeStyles((theme) => ({
		paper: {
			backgroundColor: "rgba(233, 228, 236,90)",
			boxShadow: theme.shadows[5],
		},
		headline: {
			alignSelf: "center",
		},
		drawerHead: {
			backgroundColor: theme.palette.primary.main,
			color: "#ffff",
			display: "inline-flex",
			height: "88px",
			alignItems: "center",
			/* width:min-content; */
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
				paper: classes.paper,
			}}
		>
			<div className={classes.drawerHead}>
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
			<Container maxWidth="sm">
				<Grid
					className="layer"
					container
					direction="column"
					justify="space-around"
					alignItems="center"
					spacing={2}
				>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={3}
					>
						<Box component="span" m={4} xs={3}>
							<TextField
								id="standard-basic"
								label="KeyWords"
								value={searchText}
								onChange={searchChange}
							/>
						</Box>
						<Box component="span" m={4} xs={3}>
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
						</Box>
					</Grid>
					<Grid item>
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
					</Grid>
					<Grid item>
						<FormControlLabel
							className="SentiSwitch"
							control={
								<SentiFilter senti={props.senti} sentiChange={props.setSenti} />
							}
							// label="Heatmap Layer"
						/>
					</Grid>

					<Divider />
					<Grid item p={6}>
						<Accordion search={props.search}></Accordion>
					</Grid>
					<Grid item p={6}>
						<AboutUs />
						<UserGuide />

					</Grid>
				</Grid>
			</Container>
		</Drawer>
	);
};

export default SideBar;
