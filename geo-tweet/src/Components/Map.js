// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import Markers from "./Markers";
// import "./../CSS/Drawer.css";
// import L from "leaflet";
// import "leaflet.markercluster";
// import PixiOverlay from "react-leaflet-pixi-overlay";
// import { renderToString } from "react-dom/server";

// export class Map extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			datamarkers: [],
// 			markers: [],
// 			search: props.search,
// 		};
// 	}
// 	// shouldComponentUpdate() {
// 	// 	console.log("shmap.props:", this.props);
// 	// 	return true;
// 	// }
// 	componentDidUpdate() {
// 		//	console.log(this.state.markers.filter((tweet) =>tweet))
// 		// this.state.markers=this.state.markers.map()
// 		let allTweets = this.state.datamarkers;
// 		let filteredTweets = [];
// 		let count = 0;
// 		// if (this.state.search == null) {
// 		// 	this.state.markers = filteredTweets;
// 		// 	return;
// 		// }
// 		// allTweets.forEach((tweet) => {
// 		// 	count = 0;
// 		// 	let text = " " + tweet.text + " ";
// 		// 	this.state.search.forEach((word) => {
// 		// 		if (text.includes(" " + word + " ")) {
// 		// 			count += 1;
// 		// 			console.log("find 1 match");
// 		// 		}
// 		// 	});
// 		// 	if (count >= 1) {
// 		// 		filteredTweets.push(tweet);
// 		// 	}
// 		// });

// 		// this.state.markers = filteredTweets;
// 	}

// 	componentWillMount() {
// 		const bringTweets = async () => {
// 			const res = await fetch(`http://127.0.0.1:5000/`, {
// 				headers: {
// 					"Content-Type": "application/json",
// 					Accept: "application/json",
// 				},
// 			});
// 			const data = await res.json();
// 			console.log("data:", data);
// 			let dtrim = data.slice(0, 500);
// 			this.setState({
// 				markers: [...dtrim],
// 			});
// 			// this.state.markers = data;
// 			console.log("markers:", this.state.markers);
// 		};
// 		bringTweets();
// 	}

// 	render() {
// 		const markers = [
// 			{
// 				id: "randomStringOrNumber",
// 				iconColor: "red",
// 				position: [-37.814, 144.96332],
// 				popup: renderToString(<div>All good!</div>),
// 				onClick: () => alert("marker clicked"),
// 				tooltip: "Hey!",
// 			},
// 			{
// 				id: "2",
// 				iconColor: "blue",
// 				position: [-37.814, 144.96332],
// 				popup: "Quack!",
// 				popupOpen: true, // if popup has to be open by default
// 				onClick: () => alert("marker clicked"),
// 				tooltip: "Nice!",
// 			},
// 		];
// 		const position = [30, 35];
// 		const h = window.innerHeight;
// 		const w = window.innerWidth;
// 		console.log("markers:", this.state.markers);
// 		return (
// 			<div
// 				id="mapdiv"
// 				style={{
// 					paddingBottom: "50%",
// 					position: "absolute",
// 				}}
// 			>
// 				<MapContainer
// 					style={{
// 						height: h * 0.8,
// 						width: w * 0.99,
// 						paddingTop: "10%",
// 						position: "initial",
// 						outline: "auto",
// 					}}
// 					center={position}
// 					zoom={3}
// 					zoomOffset={4}
// 				>
// 					<TileLayer
// 						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> '
// 						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 					/>
// 					<PixiOverlay markers={markers} />
// 					<MarkerClusterGroup>
// 						<Markers markersArr={this.state.markers}></Markers>
// 					</MarkerClusterGroup>
// 					;
// 				</MapContainer>
// 			</div>
// 		);
// 	}
// }
