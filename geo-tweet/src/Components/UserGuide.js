import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import page from "../Icons/page.png";
import view from "../Icons/view.png";
import filter from "../Icons/filter.png";

import stat from "../Icons/stat.jpg";
import Grid from "@material-ui/core/Grid";
import "../CSS/Drawer.css";

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
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

// eslint-disable-next-line no-unused-vars
const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

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
				more info
			</Button>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				maxWidth="lg"
			>
				<DialogTitle
					align="center"
					id="customized-dialog-title"
					onClose={handleClose}
				>
					Geo-Tweet
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom align="center">
						Geo-Tweet is a tool that illustrates the capabilities of gathering
						and analyzing information while focusing on geographical location.
					</Typography>
					<Typography gutterBottom align="center">
						So what exactly does Geo-Tweet offer?
					</Typography>
					<Grid
						className="ASbody"
						container
						direction="row"
						justify="space-around"
						alignItems="center"
						// spacing={2}
					>
						<Grid
							xs={5}
							sm={2}
							className="layer"
							container
							direction="column"
							justify="space-around"
							spacing={15}
						>
							<img src={page} alt="hey" className="iconAU" />
							<Typography gutterBottom>
								Geo-Tweet shows tweets placed on a map and classified according
								to their sentimental value
							</Typography>
						</Grid>
						<Grid
							xs={6}
							sm={2}
							className="layer"
							container
							direction="column"
							justify="space-around"
							spacing={15}
						>
							<img src={filter} alt="hey" className="iconAU" />
							<Typography gutterBottom>
								Use the sidebar to filter tweets by keywords and sentimental
								value
							</Typography>
						</Grid>
						<Grid
							xs={6}
							sm={2}
							className="layer"
							container
							direction="column"
							justify="space-around"
							spacing={15}
						>
							<img src={stat} alt="hey" className="iconAU" />
							<Typography gutterBottom>
								Take advantage of the variety of statistics offered by Geo-Tweet
								to better understand the trends
							</Typography>
						</Grid>
						<Grid
							xs={6}
							sm={2}
							className="layer"
							container
							direction="column"
							justify="space-around"
							spacing={15}
						>
							<img src={view} alt="hey" className="iconAU" />
							<Typography gutterBottom>
								The map view can be switched between a sentimental view and a
								heat map view as needed.
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
