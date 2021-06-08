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

export default function Main() {
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

						<Typography variant="h6" noWrap className={clsx(classes.headline)}>
							Select, Analyse and Explore Geo-Tweets insight
						</Typography>

						<Typography variant="h6" noWrap className={clsx(classes.headline)}>
							Search : {search}
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
	);
}
