import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./Markers";
import Loader from "./Loader";

const TestMap = (state) => {
	const [zoom, setZoom] = useState(3);
	const [isload, setIsLoad] = useState(true);
	const [tweets, setTweets] = useState([]);

	useEffect(() => {
		const bringTweets = async () => {
			const res = await fetch(`https://ancient-retreat-48472.herokuapp.com/`, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});
			const data = await res.json();
			console.log("data:", data);

			setTweets(data);
			setIsLoad(false);
		};
		bringTweets();

		console.log(tweets);
		console.log(tweets[0]);
	}, []);

	console.log("zoom ", zoom);

	// const markers = [
	// 		{
	// 			id: "1",
	// 			iconColor: "red",
	// 			position: [-36.814, 145.96332],
	// 			popup: renderToString(<div>All good!</div>),
	// 			// onClick: () => alert("marker clicked"),
	// 			tooltip: "Hey!",
	// 			country: "israel",
	// 		},
	// 		{
	// 			id: "2",
	// 			iconColor: "blue",
	// 			position: [-37.814, 144.96332],
	// 			popup: "Quack!",
	// 			popupOpen: true, // if popup has to be open by default
	// 			// onClick: () => alert("marker clicked"),
	// 			tooltip: "Nice!",
	// 		},
	//
	//
	// ];
	const h = window.innerHeight;
	const w = window.innerWidth;
	if (isload) {
		return <Loader loading={isload} />;
	} else {
		return (
			<>
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
			</>
		);
	}
};
export default TestMap;
