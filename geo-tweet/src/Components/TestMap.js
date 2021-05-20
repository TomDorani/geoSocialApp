import React, { useState, useEffect } from "react";
import PixiOverlay from "react-leaflet-pixi-overlay";
import { Map, TileLayer } from "react-leaflet";
import { renderToString } from "react-dom/server";
import Markers from "./Markers";
import HeatmapLayer from "react-leaflet-heatmap-layer";

const TestMap = (state) => {
	const [zoom, setZoom] = useState(3);

	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		const bringTweets = async () => {
			console.log("try to fetch");
			let tt = [];
			for (let i = 0; i < 5; i++) {
				console.log("fetch page:", i);
				const res = await fetch(
					`https://ancient-retreat-48472.herokuapp.com/?page=${i}`,
					{
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
					}
				);
				const data = await res.json();
				console.log("data:", data);
				tt = tt.concat(data);
			}

			setTweets(tt);
		};
		bringTweets();
		if (tweets) console.log(tweets);
		console.log(tweets[0]);
	}, []);

	console.log("zoom ", zoom);

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
					height: h * 0.9,
					width: w * 0.99,
					paddingTop: "10%",
					position: "initial",
					outline: "auto",
				}}
				preferCanvas={true}
				zoom={3}
				zoomOffset={4}
				maxZoom={17}
				minZoom={3}
				center={[-37.814, 144.96332]}
				onZoomEnd={(e) => {
					setZoom(e.target._zoom);
				}}
				// Other map props...
			>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> '
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Markers
					markersArr={tweets}
					search={state.search}
					zoom={zoom}
					heatMap={state.heatMap}
				></Markers>
			</Map>
		</div>
	);
};
export default TestMap;
