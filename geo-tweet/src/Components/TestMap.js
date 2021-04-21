import React, { useState, useEffect } from "react";
import PixiOverlay from "react-leaflet-pixi-overlay";
import { Map, TileLayer } from "react-leaflet";
import { renderToString } from "react-dom/server";

const TestMap = () => {
	const markers = [
		{
			id: "1",
			iconColor: "red",
			position: [-36.814, 145.96332],
			popup: renderToString(<div>All good!</div>),
			// onClick: () => alert("marker clicked"),
			tooltip: "Hey!",
			country: "israel",
		},
		{
			id: "2",
			iconColor: "blue",
			position: [-37.814, 144.96332],
			popup: "Quack!",
			popupOpen: true, // if popup has to be open by default
			// onClick: () => alert("marker clicked"),
			tooltip: "Nice!",
		},
	];
	const h = window.innerHeight;
	const w = window.innerWidth;
	return (
		<div
			id="mapdiv"
			style={{
				paddingBottom: "50%",
				position: "absolute",
			}}
		>
			<Map
				style={{
					height: h * 0.8,
					width: w * 0.99,
					paddingTop: "10%",
					position: "initial",
					outline: "auto",
				}}
				preferCanvas={true}
				zoom={3}
				zoomOffset={4}
				maxZoom={8}
				minZoom={3}
				center={[-37.814, 144.96332]}
				// Other map props...
			>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> '
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<PixiOverlay markers={markers} />
			</Map>
		</div>
	);
};
export default TestMap;
