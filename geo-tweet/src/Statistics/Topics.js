import React from "react";
import { VictoryBar, VictoryChart } from "victory";
import Sent from "./Sentimental";
import "../CSS/Drawer.css";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const countries = [];
const topic = {
	0: "opinions",
	1: "casual",
	2: "greeting",
	3: "jobs",
	4: "meta tweets",
};
class Topics extends React.Component {
	constructor() {
		super();

		this.state = {
			clicked: false,
			countries: [],
			bar: "",
			style: {
				data: { fill: "tomato" },
			},
		};
	}

	componentDidMount() {
		fetch(
			`https://ancient-retreat-48472.herokuapp.com/api/topic?search=${this.props.search}`
		)
			.then((response) => response.json())
			.then((res) => {
				this.setState({ countries: res });
				console.log("res in topic", res);
			});
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

		if (this.state.clicked === false && this.state.countries[0]) {
			return (
				<div className="chart">
					<VictoryChart
						domainPadding={30}
						padding={{ left: 80, right: 100, bottom: 50, top: 20 }}
						height={385}
						width={550}
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
							data={[
								{
									x: topic[this.state.countries[0][0]],
									y: this.state.countries[0][1],
								},
								{
									x: topic[this.state.countries[1][0]],
									y: this.state.countries[1][1],
								},
								{
									x: topic[this.state.countries[2][0]],
									y: this.state.countries[2][1],
								},
								{
									x: topic[this.state.countries[3][0]],
									y: this.state.countries[3][1],
								},
								{
									x: topic[this.state.countries[4][0]],
									y: this.state.countries[4][1],
								},
							]}
							events={[
								{
									target: "data",
									eventHandlers: {
										onClick: (e) => {
											// clicked(e);
                      return [{
                        target: "data",
                        mutation: (props) => {
                          clicked(props);
                        }
                      }];
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
				<div>
					<div className="sntBtn">
						<IconButton onClick={handleChange()} style={{ color: "grey" }}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Sent
						className="sentGraph"
						search={this.props.search}
						country={this.state.bar}
						flag="topic"
					></Sent>
				</div>
			);
		}
	}
}

export default Topics;
