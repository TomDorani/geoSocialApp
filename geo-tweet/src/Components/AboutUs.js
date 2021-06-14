import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import page from "../Icons/page.png";
import filters from "../Icons/Filters.png";
import stat from "../Icons/stat.jpg";
import Grid from "@material-ui/core/Grid";
import "../CSS/Drawer.css";
import whitelogo from "../logo/purple.svg";

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	hed: {
		margin: 3,
		padding: theme.spacing(2),
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className={classes.hed}
			>
				<Grid item className="pplogo">
					<img alt="filters" src={whitelogo} height="30px" />
				</Grid>
				<Grid item>
					<Typography variant="h6">{children}</Typography>
				</Grid>
				{onClose ? (
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>
				) : null}
			</Grid>
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

export default function AboutUs() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				About Us
			</Button>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				maxWidth="md"
			>
				<DialogTitle
					align="center"
					id="customized-dialog-title"
					onClose={handleClose}
				>
					{" "}
					Select, Analyse and Explore Geo-Tweets insight
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom align="center">
						Geo-Tweet is a tool that illustrates the capabilities of gathering
						and analyzing information while focusing on geographical location
					</Typography>
					<Grid
						className="ASbody"
						container
						direction="row"
						justify="space-around"
						alignItems="flex-start"
						// spacing={2}
					>
						<Grid
							sm={3}
							className="layer"
							container
							direction="column"
							justify="space-around"
							spacing={15}
						>
							<img alt="page" src={page} className="iconAU" />
							<Typography gutterBottom>
								This page displays geolocalized tweets delivered by public
								twitter stream API.
							</Typography>
						</Grid>
						<Grid
							sm={3}
							className="layer"
							container
							direction="column"
							justify="space-around"
							spacing={15}
						>
							<img alt="stat" src={stat} className="iconAU" />
							<Typography gutterBottom>
								Take advantage of the variety of statistics for your purposes.
							</Typography>
						</Grid>
						<Grid
							sm={3}
							className="layer"
							container
							direction="column"
							justify="space-around"
							spacing={15}
						>
							<img alt="filters" src={filters} className="iconAU" />
							<Typography gutterBottom>
								Play with filters and check the nice heatmap rendering!
							</Typography>
						</Grid>
					</Grid>
					<Typography gutterBottom align="center">
						We hope you enjoy and benefit using the tool! Thanks for the
						support.
					</Typography>

					<Typography gutterBottom align="center">
						Big thanks to Dr. Eli Yitzhak for the continued support.
					</Typography>
					<div align="center">
						<a href="https://github.com/TomDorani/geoSocialApp">
							https://github.com/geoSocialApp
						</a>
					</div>
				</DialogContent>
				{/* <DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						close
					</Button>
				</DialogActions> */}
			</Dialog>
		</div>
	);
}
