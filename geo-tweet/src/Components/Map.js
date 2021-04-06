import React, { Component } from "react";
import ReactDOM from "react-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Markers from "./Markers";
import "./../CSS/Drawer.css";
import L from "leaflet";
import "leaflet.markercluster";

export class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			markers: [],
			search: props.search,
		};
	}
	shouldComponentUpdate() {
		console.log("shmap.props:", this.props);
		return true;
	}
	componentDidUpdate() {
		//	console.log(this.state.markers.filter((tweet) =>tweet))
		// this.state.markers=this.state.markers.map()
		let allTweets = this.state.markers;
		let filteredTweets = [];
		let count = 0;
		for (let tweet of allTweets) {
			count = 0;
			for (let word of this.state.search) {
				tweet.text = " " + tweet.text + " ";
				var flag = tweet.text.includes(" " + word + " ");
				if (flag === true) {
					count += 1;
					break;
				}
			}
			if (count >= this.state.search.length / 2) {
				filteredTweets.push(tweet);
			}
		}
		this.state.markers = filteredTweets;
	}

	componentWillMount() {
		const bringTweets = async () => {
			const res = await fetch(`http://127.0.0.1:5000/`, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});
			const data = await res.json();
			console.log("data:", data);
			let dtrim = data.slice(0, 500);
			this.setState({
				markers: [...dtrim],
			});
			// this.state.markers = data;
			console.log("markers:", this.state.markers);
		};
		bringTweets();
	}

	render() {
		const position = [30, 35];
		const h = window.innerHeight;
		const w = window.innerWidth;
		console.log("markers:", this.state.markers);
		return (
			<div
				id="mapdiv"
				style={{
					paddingBottom: "50%",
					position: "absolute",
				}}
			>
				<MapContainer
					style={{
						height: h * 0.8,
						width: w * 0.99,
						paddingTop: "10%",
						position: "initial",
						outline: "auto",
					}}
					center={position}
					zoom={3}
					zoomOffset={4}
				>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> '
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<MarkerClusterGroup>
						<Markers markersArr={this.state.markers}></Markers>
					</MarkerClusterGroup>
					;
				</MapContainer>
			</div>
		);
	}
}
