import { useState } from "react";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

function Loader() {
	let [loading] = useState(true);

	return (
		<div className="sweet-loading">
			<Grid container direction="column" justify="center" alignItems="center">
				<Typography>Fetching Data and Analysing</Typography>
				<Divider />
				<PropagateLoader
					color={"#0077c2"}
					loading={loading}
					css={override}
					size={25}
				/>
			</Grid>
		</div>
	);
}

export default Loader;
