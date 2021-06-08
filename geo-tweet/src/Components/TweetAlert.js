import React from "react";
// import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
	di: { textAlign: "left" },
}));

export default function TweetAlert(props) {
	const classes = useStyles();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		//console.log(props.close);
		props.close();
		// setOpen(false);
	};
	const parseData = () => {
		let arr = props.data.split("%%!!%%");

		return (
			<div dir="ltr">
				<div>{arr[0]}</div>
				<div>{arr[1]}</div>
				<div>{arr[2]}</div>
				<div>{arr[3]}</div>
				<div>{arr[4]}</div>
			</div>
		);
	};

	return (
		<div className={classes.root}>
			<Snackbar
				open={props.open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert onClose={handleClose} severity="info" className={classes.di}>
					<AlertTitle>More Details</AlertTitle>
					{parseData()}
				</Alert>
			</Snackbar>
		</div>
	);
}
