import React, { useState, useEffect } from "react";
import PixiOverlay from "react-leaflet-pixi-overlay";
import { Map, TileLayer } from "react-leaflet";
import { renderToString } from "react-dom/server";
import Markers from "./Markers";
import HeatmapLayer from 'react-leaflet-heatmap-layer';




const TestMap = (state) => {



	const [zoom, setZoom] = useState(3);

	const [tweets, setTweets] = useState([]);

	useEffect(() =>{
	
	const bringTweets = async () => {
					const res = await fetch(`http://127.0.0.1:5000/`, {
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
					});
					const data = await res.json();
					console.log("data:", data);
					let dtrim = data.slice(0, 10000);
				
					setTweets(dtrim);
					
				};
				bringTweets();
				console.log(tweets);
				console.log(tweets[0]);


			},[]
		)

	
	console.log("zoom " , zoom);

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
				onZoomEnd = {(e) => {setZoom(e.target._zoom)} }
				// Other map props...


			>

				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> '
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				
				<Markers markersArr = {tweets} search = {state.search} zoom = {zoom} heatMap = {state.heatMap}></Markers>
			</Map>
		</div>
	);
};
export default TestMap;
