import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./Markers";
import Loader from "./Loader";
import TweetAlert from "./TweetAlert";
import Legend from "./Legend";

const MyMap = (state) => {
	const [zoom, setZoom] = useState(3);
	const [isload, setIsLoad] = useState(true);
	const [tweets, setTweets] = useState([]);
	const [hight, setHight] = useState(window.innerHeight);
	const [width, setWitdh] = useState(window.innerWidth);
	const [showAlert, setShowAlert] = useState(false);
	const [alertData, setAlertData] = useState("");

	const handleClick = (e) => {
		//console.log("object", showAlert);
		setShowAlert(true);
	};
	const handleClose = (e) => {
		setShowAlert(false);
	};

	useEffect(() => {
		const updateWindowDimensions = () => {
			let newHeight = window.innerHeight;
			let newidth = window.innerWidth;
			setHight(newHeight);
			setWitdh(newidth);
			//console.log("updating size");
		};

		window.addEventListener("resize", updateWindowDimensions);

		return () => window.removeEventListener("resize", updateWindowDimensions);
	}, []);

	useEffect(() => {
		const bringTweets = async () => {
			const res = await fetch(`https://ancient-retreat-48472.herokuapp.com/`);
			const data = await res.json();
			//console.log("data fetched from server");

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
				<TweetAlert open={showAlert} data={alertData} close={handleClose} />
				<div
					id="mapdiv"
					style={{
						position: "relative",
						left: "0.5%",
						top: "10px",
					}}
				>
					<Map
						style={{
							height: hight * 0.93,
							width: width * 0.99,
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
						<Legend />
						<Markers
							markersArr={tweets}
							search={state.search}
							sentifilter={state.sentiFilter}
							zoom={zoom}
							heatMap={state.heatMap}
							setOpen={handleClick}
							setData={setAlertData}
						></Markers>
					</Map>
				</div>
			</>
		);
	}
};
export default React.memo(MyMap);
