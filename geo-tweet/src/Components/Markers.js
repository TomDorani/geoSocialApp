import { Typography } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Marker, Popup } from "react-leaflet";
import { renderToString } from "react-dom/server";

// const latRef = useRef(null);
// const LngRef = useRef(null);
// const zoomRef = useRef(null);
// const zoomOffRef = useRef(null);

// function createMarker(item) {
//   latRef.current = item.lat;
//   LngRef.current = item.lng;
//   zoomRef.current = item.zoom;
//   zoomOffRef.current = item.zoomOffset;
// }
const EventsCreator = (state) => {
	const markers = state.markersArr.map((item) => {
		if (item.coordinates) {
			const position = [item.coordinates[1], item.coordinates[0]];
			const text = `"` + item.text + `"`;
			const authur = item.author + " says:";

			return {
				id: item.id,
				iconColor: "blue",
				position: position,
				popup: renderToString(
					<div>
						{authur}
						<br />
						{text}
					</div>
				),
				// onClick: () => alert("marker clicked"),
				tooltip: renderToString(
					<div>
						{authur}
						<br />
						{text}
					</div>
				),
			};
		}
	});

	return <div>{markers}</div>;
};

export default EventsCreator;
