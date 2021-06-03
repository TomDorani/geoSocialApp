import React from "react";
import PixiOverlay from "react-leaflet-pixi-overlay";
import HeatmapLayer from "react-leaflet-heatmap-layer";

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
			'<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" stroke="white"  viewBox="0 0 24 24"  fill ="' +
			color +
			'"><circle cx="12" cy="12" r="12"/></svg>'
		);
	}

	else if (zoom < 8){
		return (
			'<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" stroke="white" stroke-opacity="6" stroke-width="2" viewBox="0 0 24 24" fill ="' +
			color +
			'"><circle cx="12" cy="12" r="12"/></svg>'
		);
	}

	else if (zoom < 10) {
		return (
			'<svg width="45" height="45" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" fill = "' +
			color +'"><defs><filter id="svg_2_blur"><feGaussianBlur in="SourceGraphic" stdDeviation="2"/></filter></defs><g class="layer"><title>Layer 1</title><path d="m44.81249,5.69266c-1.62343,0.8819 -3.36821,1.47584 -5.19939,1.74355c1.8698,-1.37009 3.3057,-3.5411 3.98044,-6.1283c-1.74845,1.26886 -3.68628,2.19125 -5.74912,2.68844c-1.64917,-2.153 -4.00434,-3.49836 -6.60772,-3.49836c-5.84473,0 -10.13956,6.67274 -8.81948,13.5997c-7.52148,-0.4612 -14.1917,-4.8707 -18.65752,-11.57268c-2.37172,4.97868 -1.22998,11.49169 2.8001,14.78982c-1.48186,-0.0585 -2.87916,-0.55568 -4.09811,-1.38584c-0.09928,5.13167 2.90673,9.93262 7.2604,11.00124c-1.27411,0.42295 -2.66957,0.52194 -4.08892,0.18898c1.15093,4.4005 4.49339,7.60189 8.45729,7.69188c-3.80578,3.65133 -8.6007,5.2824 -13.40297,4.58948c4.00618,3.14289 8.76617,4.97643 13.87732,4.97643c16.80795,0 26.30402,-17.37027 25.73039,-32.94974c1.76868,-1.56357 3.30386,-3.5141 4.5173,-5.7346l-0.00002,0l0.00001,0.00001l0,-0.00001z" fill="#ffffff" filter="url(#svg_2_blur)" id="svg_2"/><path d="m42.87501,7.67472c-1.46247,0.79397 -3.03425,1.32869 -4.68387,1.56971c1.68441,-1.23349 2.97794,-3.18803 3.58578,-5.51727c-1.57509,1.14235 -3.32078,1.97277 -5.1791,2.42039c-1.48566,-1.93834 -3.60731,-3.14955 -5.95256,-3.14955c-5.26522,0 -9.13422,6.00743 -7.94503,12.24373c-6.77572,-0.41521 -12.78459,-4.38506 -16.80762,-10.41881c-2.13656,4.48227 -1.10803,10.3459 2.52247,13.31518c-1.33493,-0.05266 -2.59369,-0.50028 -3.69178,-1.24766c-0.08944,4.62001 2.61853,8.94228 6.54053,9.90435c-1.14778,0.38078 -2.40488,0.4699 -3.6835,0.17014c1.03681,3.96174 4.04787,6.84393 7.61875,6.92495c-3.42844,3.28727 -7.74794,4.75571 -12.07406,4.13188c3.60897,2.82953 7.897,4.48025 12.50138,4.48025c15.14144,0 23.69597,-15.63835 23.17922,-29.66446c1.59331,-1.40767 2.97628,-3.16372 4.06941,-5.16282l-0.00002,0l0.00001,0.00001l-0.00001,-0.00002z" id="svg_1"/></g></svg>'
		);
	}

	else{

		return (
			'<svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" fill = "' +
			color +'"><title>tw</title><defs><filter id="svg_1_blur"><feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/></filter></defs><g class="layer"><title>Layer 1</title><path d="m68.375,11.30724c-2.33167,1.19845 -4.83762,2.00557 -7.46768,2.36938c2.68551,-1.86187 4.74785,-4.81214 5.71695,-8.32801c-2.51124,1.7243 -5.29445,2.97778 -8.25724,3.65345c-2.36865,-2.9258 -5.75128,-4.75406 -9.49041,-4.75406c-8.39455,0 -14.56305,9.06786 -12.66707,18.48119c-10.8028,-0.62673 -20.38299,-6.61899 -26.79706,-15.72661c-3.40641,6.76574 -1.76657,15.61654 4.02167,20.09849c-2.12834,-0.07948 -4.13522,-0.75514 -5.88596,-1.88328c-0.14259,6.97363 4.17482,13.49785 10.42783,14.95004c-1.82996,0.57476 -3.83419,0.70928 -5.87276,0.25682c1.65302,5.98002 6.45368,10.33052 12.14688,10.45281c-5.46609,4.96195 -12.35285,7.17848 -19.25016,6.23683c5.75392,4.271 12.59051,6.76268 19.93144,6.76268c24.1406,0 37.77943,-23.60518 36.95554,-44.77679c2.54027,-2.12481 4.74521,-4.77545 6.48801,-7.79298l0.00002,0.00001l0,0.00001z" filter="url(#svg_1_blur)" id="svg_1"/><path id="svg_2" opacity="0.5" stroke-width="2"/><path id="svg_3" opacity="0.5" stroke-width="2"/><text fill="#000000" font-family="Serif" font-size="24" id="svg_4" stroke-width="0" text-anchor="middle" x="-69.59998" xml:space="preserve" y="22.20001"/></g></svg>'
		);
	}
};

const itemIDPick = (zoom, senti) => {
	if (zoom < 5) {
		return "zoom1" + senti;
	}

	else if (zoom < 8){
		return "zoom2" + senti;
	}

	else if (zoom < 11){
		return "zoom3" + senti;
	}

	else {
		return "zoom4" + senti;
	}


};

const filterTweets = (tweets, search) => {
	console.log(tweets[0]);

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

	console.log("tweets len: ", filteredTweets.length);
	return filteredTweets;
};
const EventsCreator = (state) => {
	console.log("heatMap : " + state.heatMap);
	console.log("search : " + state.search);

	const filteredTweets = filterTweets(state.markersArr, state.search);
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
				popup: "",
				popupOpen: false,
				tooltip: `"` + item.text + `" by` + item.author,
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
