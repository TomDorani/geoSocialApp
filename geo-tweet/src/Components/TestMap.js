import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./Markers";
import Loader from "./Loader";

const TestMap = (state) => {
	const [zoom, setZoom] = useState(3);
	const [isload, setIsLoad] = useState(true);
	const [tweets, setTweets] = useState([]);
	const [hight, setHight] = useState(window.innerHeight);
	const [width, setWitdh] = useState(window.innerWidth);

	useEffect(() => {
		const updateWindowDimensions = () => {
			let newHeight = window.innerHeight;
			let newidth = window.innerWidth;
			setHight(newHeight);
			setWitdh(newidth);
			console.log("updating size");
		};

		window.addEventListener("resize", updateWindowDimensions);

		return () => window.removeEventListener("resize", updateWindowDimensions);
	}, []);

	useEffect(() => {
		const bringTweets = async () => {
			const res = await fetch(`https://ancient-retreat-48472.herokuapp.com/`);
			const data = await res.json();
			console.log("data fetched from server");

			setTweets(data);
			setIsLoad(false);
		};
		bringTweets();

		// console.log(tweets);
		// console.log(tweets[0]);
	}, []);

	// console.log("zoom ", zoom);

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
							height: hight * 0.99,
							width: width * 0.99,
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
							sentifilter={state.sentiFilter}
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
