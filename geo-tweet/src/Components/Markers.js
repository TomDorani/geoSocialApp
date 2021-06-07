import React from "react";
import PixiOverlay from "react-leaflet-pixi-overlay";
import HeatmapLayer from "react-leaflet-heatmap-layer";
//import { Alert, AlertTitle } from "@material-ui/lab";
// import MuiAlert from "@material-ui/lab/Alert";

const colorSentiMap = {
	MIXED: "#ffff66",
	NEGATIVE: "#e0544a",
	NEUTRAL: "#3fb0cf",
	POSITIVE: "#53c653",
};

const iconByZoom = (zoom, senti) => {
	let color = colorSentiMap[senti];

	if (zoom < 4) {
		return (
			'<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" stroke="white"  viewBox="0 0 24 24"  fill ="' +
			color +
			'"><circle cx="12" cy="12" r="12"/></svg>'
		);
	} else if (zoom < 6) {
		return (
			'<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" stroke="white" stroke-opacity="6" stroke-width="2" viewBox="0 0 24 24" fill ="' +
			color +
			'"><circle cx="12" cy="12" r="12"/></svg>'
		);
	} else if (zoom < 8) {
		return (
			'<svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs><filter id="svg_6_blur"><feGaussianBlur in="SourceGraphic" stdDeviation="1"/></filter><filter id="svg_2_blur"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5"/></filter></defs><g class="layer"><title>Layer 1</title><path d="m27.68749,3.36429c-1.00717,0.55028 -2.08962,0.92087 -3.22569,1.08792c1.16002,-0.85489 2.05084,-2.20952 2.46946,-3.82385c-1.08473,0.79173 -2.28695,1.36727 -3.56674,1.6775c-1.02314,-1.3434 -2.48428,-2.18286 -4.09941,-2.18286c-3.62605,0 -6.29055,4.16356 -5.47158,8.48575c-4.6663,-0.28777 -8.80448,-3.03915 -11.57506,-7.22096c-1.47141,3.10652 -0.76307,7.17043 1.73717,9.22834c-0.91934,-0.0365 -1.78622,-0.34673 -2.54245,-0.86471c-0.06159,3.20199 1.80333,6.19762 4.50433,6.8644c-0.79045,0.26391 -1.65619,0.32568 -2.53675,0.11792c0.71403,2.74576 2.78769,4.74332 5.24688,4.79947c-2.36109,2.27831 -5.33584,3.29604 -8.31516,2.86368c2.48542,1.96106 5.4385,3.10513 8.60944,3.10513c10.42759,0 16.31893,-10.83846 15.96305,-20.55953c1.09728,-0.97561 2.0497,-2.19268 2.80252,-3.57819l-0.00001,0l0.00001,0.00001l-0.00001,-0.00001l-0.00001,-0.00001l0.00001,0z" fill="#fff" filter="url(#svg_6_blur)" id="svg_6"/><path d="m27.19367,5.25299c-0.8876,0.47491 -1.84154,0.79475 -2.84273,0.93891c1.0223,-0.7378 1.80737,-1.90689 2.17628,-3.30011c-0.95595,0.68329 -2.01544,1.18 -3.14329,1.44774c-0.90167,-1.1594 -2.18934,-1.88388 -3.61272,-1.88388c-3.19556,0 -5.54373,3.5933 -4.82198,7.32349c-4.11231,-0.24835 -7.7592,-2.62289 -10.20085,-6.23193c-1.29672,2.68103 -0.67248,6.18832 1.53093,7.96437c-0.81019,-0.0315 -1.57416,-0.29924 -2.24061,-0.74628c-0.05428,2.76342 1.58923,5.34875 3.96957,5.92421c-0.69661,0.22776 -1.45957,0.28107 -2.23558,0.10177c0.62926,2.36968 2.45673,4.09364 4.62396,4.1421c-2.08078,1.96625 -4.70237,2.84459 -7.32797,2.47145c2.19035,1.69246 4.79283,2.67983 7.58732,2.67983c9.18962,0 14.38152,-9.35395 14.06789,-17.74356c0.96701,-0.84199 1.80636,-1.89235 2.4698,-3.0881l-0.00001,0l0.00001,0.00001l-0.00001,-0.00001l-0.00001,-0.00001z" fill="' +
			color +
			'" id="svg_1"/></g></svg>'
		);
	} else {
		return (
			'<svg width="45" height="45" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" fill = "' +
			color +
			'"><defs><filter id="svg_2_blur"><feGaussianBlur in="SourceGraphic" stdDeviation="2"/></filter></defs><g class="layer"><title>Layer 1</title><path d="m44.81249,5.69266c-1.62343,0.8819 -3.36821,1.47584 -5.19939,1.74355c1.8698,-1.37009 3.3057,-3.5411 3.98044,-6.1283c-1.74845,1.26886 -3.68628,2.19125 -5.74912,2.68844c-1.64917,-2.153 -4.00434,-3.49836 -6.60772,-3.49836c-5.84473,0 -10.13956,6.67274 -8.81948,13.5997c-7.52148,-0.4612 -14.1917,-4.8707 -18.65752,-11.57268c-2.37172,4.97868 -1.22998,11.49169 2.8001,14.78982c-1.48186,-0.0585 -2.87916,-0.55568 -4.09811,-1.38584c-0.09928,5.13167 2.90673,9.93262 7.2604,11.00124c-1.27411,0.42295 -2.66957,0.52194 -4.08892,0.18898c1.15093,4.4005 4.49339,7.60189 8.45729,7.69188c-3.80578,3.65133 -8.6007,5.2824 -13.40297,4.58948c4.00618,3.14289 8.76617,4.97643 13.87732,4.97643c16.80795,0 26.30402,-17.37027 25.73039,-32.94974c1.76868,-1.56357 3.30386,-3.5141 4.5173,-5.7346l-0.00002,0l0.00001,0.00001l0,-0.00001z" fill="#ffffff" filter="url(#svg_2_blur)" id="svg_2"/><path d="m42.87501,7.67472c-1.46247,0.79397 -3.03425,1.32869 -4.68387,1.56971c1.68441,-1.23349 2.97794,-3.18803 3.58578,-5.51727c-1.57509,1.14235 -3.32078,1.97277 -5.1791,2.42039c-1.48566,-1.93834 -3.60731,-3.14955 -5.95256,-3.14955c-5.26522,0 -9.13422,6.00743 -7.94503,12.24373c-6.77572,-0.41521 -12.78459,-4.38506 -16.80762,-10.41881c-2.13656,4.48227 -1.10803,10.3459 2.52247,13.31518c-1.33493,-0.05266 -2.59369,-0.50028 -3.69178,-1.24766c-0.08944,4.62001 2.61853,8.94228 6.54053,9.90435c-1.14778,0.38078 -2.40488,0.4699 -3.6835,0.17014c1.03681,3.96174 4.04787,6.84393 7.61875,6.92495c-3.42844,3.28727 -7.74794,4.75571 -12.07406,4.13188c3.60897,2.82953 7.897,4.48025 12.50138,4.48025c15.14144,0 23.69597,-15.63835 23.17922,-29.66446c1.59331,-1.40767 2.97628,-3.16372 4.06941,-5.16282l-0.00002,0l0.00001,0.00001l-0.00001,-0.00002z" id="svg_1"/></g></svg>'
		);
	}
};

const itemIDPick = (zoom, senti) => {
	if (zoom < 4) {
		return "zoom1" + senti;
	} else if (zoom < 6) {
		return "zoom2" + senti;
	} else if (zoom < 8) {
		return "zoom3" + senti;
	} else {
		return "zoom4" + senti;
	}
};

const alertCreator = (item) => {
	console.log("item", item);
	let str =
		"Author: " +
		item.author +
		"%%!!%%" +
		"Number of Friends:" +
		item["number of friend"] +
		"%%!!%%" +
		"Tweet: " +
		item.text +
		"%%!!%%" +
		"Time: " +
		item.timestamp +
		"%%!!%%" +
		"Topic: " +
		item.topic;
	return str;
};

const tooltipCreator = (zoom, text) => {
	if (zoom < 5) {
		return "";
	} else {
		return `" ` + text + ` "`;
	}
};

const filterTweets = (tweets, search, sentifilter) => {
	//console.log("filtring", sentifilter);

	var filteredTweets = [];
	console.log("filterTweets" + search.length);
	if (search.length === 0) {
		filteredTweets = tweets;
	} else {
		tweets.forEach((tweet) => {
			let counter = 0;
			search.forEach((word) => {
				word = " " + word + " ";
				let text = " " + tweet.text + " ";
				word = word.toLowerCase();
				text = text.toLowerCase();
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

	if (filteredTweets.length === 0) {
		alert("No tweets found");
		filteredTweets = tweets;
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
	console.log("zoom", state);
	// console.log("search : " + state.search);
	// console.log("senti : ", state.sentifilter);

	const handleOpen = (i) => {
		console.log("markers handleopen", state.setOpen, i);
		state.setData(i);
		state.setOpen();
	};

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
				position: position,
				tooltip: tooltipCreator(state.zoom, item.text),
				onClick: () => {
					if (state.zoom >= 4) {
						handleOpen(alertCreator(item));
					}
				},
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
