import React from "react";
import PixiOverlay from "react-leaflet-pixi-overlay";
import HeatmapLayer from "react-leaflet-heatmap-layer";
//import { Alert, AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";

const colorSentiMap = {
	MIXED: "#ffff66",
	NEGATIVE: "#e0544a",
	NEUTRAL: "#3fb0cf",
	POSITIVE: "#53c653",
};

const iconByZoom = (zoom, senti) => {
	let color = colorSentiMap[senti];

	if (zoom < 5) {
		return (
			'<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 24 24" stroke="blue" stroke-opacity="0.8" fill ="' +
			color +
			'"><circle cx="12" cy="12" r="12"/></svg>'
		);
	} else if (zoom < 8) {
		return (
			'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill ="' +
			color +
			'"><circle cx="12" cy="12" r="12"/></svg>'
		);
	} else if (zoom < 10) {
		return (
			'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"   fill = "' +
			color +
			'"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>'
		);
	} else {
		return (
			'<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" fill = "' +
			color +
			'" ><path d="m56.375,9.53145c-1.92696,0.89697 -3.99796,1.50106 -6.17152,1.77335c2.21939,-1.39351 3.92376,-3.60162 4.72466,-6.23305c-2.07536,1.29054 -4.37549,2.2287 -6.82403,2.7344c-1.95752,-2.1898 -4.75303,-3.55815 -7.84316,-3.55815c-6.93751,0 -12.03534,6.78679 -10.46845,13.83215c-8.92776,-0.46908 -16.84511,-4.95395 -22.1459,-11.77049c-2.81516,5.06378 -1.45995,11.68811 3.32363,15.04261c-1.75893,-0.05949 -3.41747,-0.56518 -4.86433,-1.40953c-0.11784,5.21938 3.4502,10.10239 8.61787,11.18928c-1.51233,0.43018 -3.16869,0.53086 -4.85342,0.19221c1.36611,4.47571 5.33352,7.73182 10.03854,7.82335c-4.51734,3.71374 -10.20876,5.37269 -15.90891,4.66792c4.75521,3.19661 10.40517,5.06149 16.47194,5.06149c19.95051,0 31.22205,-17.66717 30.54117,-33.51294c2.09936,-1.5903 3.92158,-3.57416 5.36189,-5.83261z"/></svg>'
		);
	}
};

const itemIDPick = (zoom, senti) => {
	if (zoom < 5) {
		return "zoom1" + senti;
	} else if (zoom < 8) {
		return "zoom2" + senti;
	} else if (zoom < 10) {
		return "zoom3" + senti;
	} else {
		return "zoom4" + senti;
	}
};

const tooltipCreator = (zoom, text) => {
	if (zoom < 7) {
		return "";
	} else {
		return `" ` + text + ` "`;
	}
};

const filterTweets = (tweets, search, sentifilter) => {
	//console.log("filtring", sentifilter);

	var filteredTweets = [];

	if (search.length === 0) {
		filteredTweets = tweets;
	} else {
		tweets.forEach((tweet) => {
			let counter = 0;
			search.forEach((word) => {
				word = " " + word + " ";
				let text = " " + tweet.text + " ";
				let flag = text.includes(word);
				if (flag === true) {
					counter++;
				}
			});
			if (counter > 0) {
				filteredTweets.push(tweet);
			}
		});
	}
	if (sentifilter !== "ALL") {
		// console.log("senti filtering....");
		filteredTweets = filteredTweets.filter(function (tw) {
			return tw.sentimental === sentifilter;
		});
	}

	// console.log("tweets len: ", filteredTweets.length);
	return filteredTweets;
};
const EventsCreator = (state) => {
	console.log("zoom", state.zoom);
	// console.log("search : " + state.search);
	// console.log("senti : ", state.sentifilter);
	const filteredTweets = filterTweets(
		state.markersArr,
		state.search,
		state.sentifilter
	);
	const markers = filteredTweets.map((item) => {
		if (item.coordinate) {
			let cord = JSON.parse(item.coordinate);
			const position = [cord[0], cord[1]];

			return {
				id: item.id,
				iconId: `icon-${itemIDPick(state.zoom, item.sentimental)}`,
				customIcon: iconByZoom(state.zoom, item.sentimental),
				// customIcon: '<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"   fill = "#1da1f2"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>',
				position: position,
				tooltip: tooltipCreator(state.zoom, item.text),
			};
		}
		return undefined;
	});

	if (state.heatMap === false) {
		return <PixiOverlay markers={markers} />;
	} else {
		return (
			<HeatmapLayer
				// max = {4}
				// fitBoundsOnLoad
				// fitBoundsOnUpdate
				points={filteredTweets}
				longitudeExtractor={(m) => JSON.parse(m.coordinate)[1]}
				latitudeExtractor={(m) => JSON.parse(m.coordinate)[0]}
				intensityExtractor={(m) => parseFloat(8)}
			/>
		);
	}
};

export default EventsCreator;
