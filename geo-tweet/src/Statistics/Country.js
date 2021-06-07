import React from "react";
import { VictoryBar, VictoryChart } from "victory";
import Sent from "./Sentimental";
import "../CSS/Drawer.css";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Loader from "./../Components/Loader";
import Box from "@material-ui/core/Box";
const countries = [];

class Country extends React.Component {
	constructor() {
		super();

		this.state = {
			clicked: false,
			countries: [],
			countriesData: [],
			bar: "",
			style: {
				data: { fill: "tomato" },
			},
			isloading: true,
		};
	}

	componentDidMount() {
		let coData = [];
		fetch(
			`https://ancient-retreat-48472.herokuapp.com/api/country?search=${this.props.search}`
		)
			.then((response) => response.json())
			.then((res) => {
				this.setState({ countries: res });
				console.log("country " + this.state.countries);
				this.state.countries.forEach(element => {
					coData.push({x: element[0],
							y: element[1],},)
				});
				console.log("coData " + coData);
				this.setState({ countriesData: coData });

				this.setState({ isloading: false });
			});
	}
	componentDidUpdate(prevProps) {
		if (prevProps.text !== this.props.text) {
			let coData = [];
			fetch(
				`https://ancient-retreat-48472.herokuapp.com/api/country?search=${this.props.search}`
			)
				.then((response) => response.json())
				.then((res) => {
					this.setState({ countries: res });
					console.log("country did" + this.state.countries);
					this.state.countries.forEach(element => {
						coData.push({x: element[0],
								y: element[1],},)
					});
					console.log("coData did " + coData);
					this.setState({ countriesData: coData });
	
					this.setState({ isloading: false });
				});
		}
	  }

	render() {
		const clicked = (e) => {
			console.log("hey click", e);
			console.log("bar", e.datum.x);
			this.setState({ clicked: true });
			this.setState({
				bar: e.datum.x,
			});

			// this.forceUpdate();
		};

		const handleChange = (panel) => (event, isExpanded) => {
			this.setState({ clicked: false });
			// this.forceUpdate();
		};
		if (this.state.isloading) {
			return (
				<Box>
					<Loader loading={this.state.isloading} />
				</Box>
			);
		} else if (this.state.clicked === false && this.state.countries[0]) {
			return (
				<div className="chart">
					<VictoryChart
						domainPadding={30}
						padding={{ left: 80, right: 100, bottom: 50, top: 20 }}
						height={385}
						width={650}
					>
						<VictoryBar
							cornerRadius={{ topLeft: 10 }}
							style={{
								data: {
									fill: "#1da1f2",
									width: 25,
								},
							}}
							categories={{
								x: countries,
							}}

							data = {this.state.countriesData}
							
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
						search={this.props.search}
						country={this.state.bar}
						flag="country"
					></Sent>
				</Box>
			);
		}
	}
}

export default Country;
