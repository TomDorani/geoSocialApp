import React, { useState, useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import Sent from "../Statistics/Sentimental";
import "../CSS/Drawer.css";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Loader from "./../Components/Loader";
import Box from "@material-ui/core/Box";

const CountryFunc = (props) => {
	//console.log("CountryFunc search", props.search.toString());

	const [clickedFlag, setClickedFlag] = useState(false);

	const [countriesData, setCountriesData] = useState([]);
	const [bar, setBar] = useState("");
	const [isloading, setIsloading] = useState(true);

	const topic = {
		0: "opinions",
		1: "casual",
		2: "greeting",
		3: "jobs",
		4: "meta tweets",
	};

	const clicked = (e) => {
		//console.log("hey click", e);
		//console.log("bar", e.datum.x);
		setClickedFlag(true);
		setBar(e.datum.x);
	};

	const handleChange = (panel) => (event, isExpanded) => {
		setClickedFlag(false);
	};

	useEffect(() => {
		setIsloading(true);
		let coData = [];

		//console.log("fetch in cpuntryfunc:::::", props.search, isloading);
		const query = async () => {
			const res = await fetch(
				`https://ancient-retreat-48472.herokuapp.com/api/topic?search=${props.search.toString()}`
			);
			const data = await res.json();
			//console.log("fetched data countries", data);
			data.forEach((element) => {
				coData.push({ x: topic[element[0]], y: element[1] });
			});
			//console.log("codata:", coData);
			setCountriesData(coData);
		};

		query();
		setIsloading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.search]);

	if (isloading) {
		return (
			<Box>
				<Loader loading={isloading} />
			</Box>
		);
	} else if (clickedFlag === false && countriesData[0]) {
		return (
			<div className="chart">
				<svg className="gard">
					<defs>
						<linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#FDD678" />
							<stop offset="100%" stopColor="#FE6A9D" />
						</linearGradient>
					</defs>
				</svg>
				<VictoryChart
					domainPadding={30}
					padding={{ left: 80, right: 100, bottom: 50, top: 20 }}
					height={385}
					width={650}
					style={{ fontSize: "55px" }}
				>
					<VictoryAxis
						style={{
							// grid: { stroke: "grey" },
							tickLabels: { fontSize: 16, padding: 3 },
						}}
						standalone={false}
					/>
					<VictoryAxis dependentAxis />
					<VictoryBar
						cornerRadius={{ topLeft: 10 }}
						style={{
							data: {
								fill: "url(#myGradient)",
								width: 40,
								fontSize: "55px",
							},
							fontSize: "55px",
						}}
						data={countriesData}
						events={[
							{
								target: "data",
								eventHandlers: {
									onClick: (e) => {
										// clicked(e);
										return [
											{
												target: "data",
												mutation: (props) => {
													clicked(props);
												},
											},
										];
									},
								},
							},
						]}
					/>
				</VictoryChart>
			</div>
		);
	} else {
		// this.setState({ clicked: false });
		return (
			<Box component="span" className="chart" style={{ width: "100%" }}>
				<div className="sntBtn">
					<IconButton onClick={handleChange()} style={{ color: "grey" }}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Sent
					className="sentGraph"
					search={props.search}
					country={bar}
					flag="topic"
				></Sent>
			</Box>
		);
	}
};
export default CountryFunc;
