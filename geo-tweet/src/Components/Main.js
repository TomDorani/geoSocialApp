import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "../CSS/Drawer.css";
import MyMap from "./MyMap";
import SideBar from "./SideBar";
import { Grid } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

/*
the main component that conatin the map and side bar
 */

const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: "#7D71E5",
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: "#0066ff",
			main: "#0044ff",
			// dark: will be calculated from palette.secondary.main,
			contrastText: "#ffcc00",
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
});

export default function Main() {
	// search- filter word
	// heatmap- active/inactive
	//senti- ALL/MIXED/POSITIVE/NEGATIVE/NEUTRAL
	//open- true/false
	const [search, setSearch] = useState([]);
	const [heatMap, setHeatMap] = useState(false);
	const [senti, setSenti] = useState("ALL");
	const [open, setOpen] = useState(false);

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
			padding: "28px",
		},
	}));

	const classes = useStyles();

	const changeHeatmap = () => {
		setHeatMap(!heatMap);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appbar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
						>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								// edge="start"
								className={clsx(classes.menuButton, open && classes.hide)}
							>
								<MenuIcon />
							</IconButton>

							<Typography
								variant="h6"
								noWrap
								className={clsx(classes.headline)}
							>
								Select, Analyse and Explore Geo-Tweets insight
							</Typography>

							<Typography
								variant="h6"
								r={-6}
								noWrap
								className={clsx(classes.headline)}
							>
								Your Search : {search}
							</Typography>
						</Grid>
					</Toolbar>
				</AppBar>
				<SideBar
					search={search}
					open={open}
					closeDrawer={handleDrawerClose}
					setOpen={setOpen}
					setSearch={setSearch}
					heatMap={heatMap}
					heatMapChange={changeHeatmap}
					senti={senti}
					setSenti={setSenti}
				/>

				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} style={{ marginTop: "4%" }} />

					<MyMap search={search} heatMap={heatMap} sentiFilter={senti} />
				</main>
			</div>
		</ThemeProvider>
	);
}
