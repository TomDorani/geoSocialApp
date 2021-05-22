import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "../CSS/Drawer.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TestMap from "./TestMap";
import Country from "../Statistics/Country";
import Sent from "../Statistics/Sentimental";
import Accordion from "./Accordion";

// import { Dialog } from "@material-ui/core";
// const drawerWidth = "80vmin";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		display: "flex",
// 	},
// 	appBar: {
// 		transition: theme.transitions.create(["margin", "width"], {
// 			easing: theme.transitions.easing.sharp,
// 			duration: theme.transitions.duration.leavingScreen,
// 		}),
// 	},
// 	appBarShift: {
// 		width: `calc(100% - ${drawerWidth}px)`,
// 		marginLeft: drawerWidth,
// 		transition: theme.transitions.create(["margin", "width"], {
// 			easing: theme.transitions.easing.easeOut,
// 			duration: theme.transitions.duration.enteringScreen,
// 		}),
// 	},
// 	menuButton: {
// 		marginRight: theme.spacing(2),
// 	},
// 	hide: {
// 		display: "none",
// 	},
// 	drawer: {
// 		width: drawerWidth,
// 		flexShrink: 0,
// 	},
// 	drawerPaper: {
// 		width: drawerWidth,
// 	},
// 	drawerHeader: {
// 		display: "flex",
// 		alignItems: "center",

// 		padding: theme.spacing(0, 1),
// 		// necessary for content to be below app bar
// 		...theme.mixins.toolbar,
// 		justifyContent: "flex-end",
// 	},
// 	content: {
// 		flexGrow: 1,
// 		transition: theme.transitions.create("margin", {
// 			easing: theme.transitions.easing.sharp,
// 			duration: theme.transitions.duration.leavingScreen,
// 		}),
// 	},
// 	contentShift: {
// 		transition: theme.transitions.create("margin", {
// 			easing: theme.transitions.easing.easeOut,
// 			duration: theme.transitions.duration.enteringScreen,
// 		}),
// 		marginLeft: 0,
// 	},
// }));

function getModalStyle() {
	const top = 20;
	const left = 20;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

export default function PersistentDrawerLeft() {
	const [state, setState] = useState({
		heatMap: false,
		keyWords: "",
	});

	const [search, setSearch] = useState([]);
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalStyle] = useState(getModalStyle);
	// const [keyWords, setKeywords] = useState();

	const [contactUsIsOpen, setContactUsIsOpen] = useState(false);
	const [topicIsOpen, setTopicIsOpen] = useState(false);

	// const handleModalOpen = () => {
	// 	setModalIsOpen(true);
	// 	console.log("open");
	// };

	const handleModalClose = () => {
		setModalIsOpen(false);
	};

	const contactUsOpen = () => {
		console.log("Contact Us");
		setContactUsIsOpen(true);
	};

	const contactUsClose = () => {
		console.log("Contact Us");
		setContactUsIsOpen(false);
	};

	// const topicOpen = () => {
	// 	console.log("Contact Us");
	// 	setTopicIsOpen(true);
	// };

	const topicClose = () => {
		console.log("Contact Us");
		setTopicIsOpen(false);
	};

	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: 1100,
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(3, 4, 3),
		},
	}));

	const classes = useStyles();

	const countryBody = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Segmentation by countries</h2>
			<Button
				variant="outlined"
				size="medium"
				color="primary"
				style={{ marginLeft: "42%" }}
			>
				Sentimental View
			</Button>
			<Country />
		</div>
	);
	const topicBody = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Segmentation by topics</h2>
			<Button
				variant="outlined"
				size="medium"
				color="primary"
				style={{ marginLeft: "42%" }}
			>
				Sentimental View
			</Button>
			<Sent />
		</div>
	);

	const contactUsBody = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="contact-us-title">Contact Us</h2>
			<TextField id="outlined-basic" label="Subject" />
			<h4 id="contact-us-text-title">
				Please provide a brief description of your issue.
			</h4>

			<TextField
				id="outlined-multiline-static"
				multiline
				rows={4}
				lable="Brief Description"
				variant="outlined"
				style={{ paddingRight: "60%" }}
			/>
			<div>
				<Button
					variant="outlined"
					size="medium"
					color="inherit"
					style={{ marginLeft: "90%" }}
				>
					Submit
				</Button>
			</div>
		</div>
	);

	const checkSearch = (event) => {
		if (state.search === "" || state.search == null) {
			setSearch([]);
		} else {
			let words = state.search.split(" ");
			console.log("key,words:", words);
			setSearch(words);
		}
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const searchChange = (event) => {
		state.search = event.target.value;
	};

	// const m = [
	// 	{
	// 		lat: 51.505,
	// 		lng: -0.09,
	// 		zoom: 1,
	// 		zoomOffset: 1,
	// 	},
	// 	{
	// 		lat: 20.505,
	// 		lng: -0.09,
	// 		zoom: 1,
	// 		zoomOffset: 1,
	// 	},
	// ];

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Geo Tweet
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="left"
				open={open}
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
						Geo Tweet
					</Typography>
					<div className="DrawerButton">
						<IconButton onClick={handleDrawerClose} style={{ color: "white" }}>
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
							<Grid item direction="row">
								<TextField
									id="standard-basic"
									label="KeyWords"
									onChange={(e) => {
										searchChange(e);
									}}
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
											checked={state.heatMap}
											onChange={handleChange}
											name="heatMap"
											color="primary"
										/>
									}
									label="Heatmap Layer"
								/>
							</FormGroup>
						</Grid>

						{/* <FormControl component="fieldset">
							<FormLabel component="legend">View</FormLabel>
							<br></br>
							<div className="gap">
								<ToggleButtons></ToggleButtons>
							</div>
						</FormControl> */}
					</Container>
				</List>
				<Divider />
				<List>
					<Accordion search={search}></Accordion>
					{/* <ListItem button key={"Country Statistics"} onClick={handleModalOpen}>
						<ListItemIcon>
							<EqualizerIcon />
						</ListItemIcon>
						<ListItemText primary={"Country Statistics"} />
					</ListItem>
					<ListItem button key={"Topic Statistics"} onClick={topicOpen}>
						<ListItemIcon>
							<EqualizerIcon />
						</ListItemIcon>
						<ListItemText primary={"Topic Statistics"} />
					</ListItem> */}
					<ListItem button key={"Contact Us"} onClick={contactUsOpen}>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary={"Contact Us"} />
					</ListItem>
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} style={{ marginTop: "4%" }} />
				{/* <Map search={search} /> */}
				<TestMap search={search} heatMap={state.heatMap} />
			</main>

			<Modal
				id="modal"
				open={modalIsOpen}
				onClose={handleModalClose}
				className="CountryModal"
			>
				{countryBody}
			</Modal>
			<Modal id="TopicModal" open={topicIsOpen} onClose={topicClose}>
				{topicBody}
			</Modal>

			<Modal
				id="contactUsModal"
				open={contactUsIsOpen}
				onClose={contactUsClose}
			>
				{contactUsBody}
			</Modal>
		</div>
	);
}
