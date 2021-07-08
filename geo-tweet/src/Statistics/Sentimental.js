import React from "react";
import { VictoryPie } from "victory";
import "../CSS/Drawer.css";
import Loader from "./../Components/Loader";
import Box from "@material-ui/core/Box";

/*
statistics render by victory chart 
 */

class Sent extends React.Component {
	state = {
		sent: {},
		isloading: true,
	};

	componentDidMount() {
		//console.log("mount");
		fetch(
			`https://ancient-retreat-48472.herokuapp.com/api/${this.props.flag}/senti?search=${this.props.search}&${this.props.flag}=${this.props.country}`
		)
			.then((response) => response.json())
			.then((res) => {
				//console.log("res in sent", res);
				this.setState({ sent: res });
				this.setState({ isloading: false });
			});
	}

	render() {
		const topic = {
			0: "opinions",
			1: "casual",
			2: "greeting",
			3: "jobs",
			4: "meta tweets",
		};
		//console.log(this.state.sent);

		const values = [];
		values.push(this.state.sent["POSITIVE"]);
		values.push(this.state.sent["NEGATIVE"]);
		values.push(this.state.sent["NEUTRAL"]);
		values.push(this.state.sent["MIXED"]);

		const pre = values;
		var sum = values[0] + values[1] + values[2] + values[3];
		pre[0] = Math.round((values[0] / sum) * 100);
		pre[1] = Math.round((values[1] / sum) * 100);
		pre[2] = Math.round((values[2] / sum) * 100);
		pre[3] = 100 - pre[0] - pre[1] - pre[2];

		//console.log("search in sent " + this.props.search);
		//console.log("country in sent " + this.props.country);

		if (this.state.isloading) {
			return (
				<Box>
					<Loader loading={this.state.isloading} />
				</Box>
			);
		} else {
			return (
				<div>
					{this.props.flag === "topic" ? (
						<h4>{topic[this.props.country]}</h4>
					) : (
						<h4>{this.props.country}</h4>
					)}

					<i className="sentLegend">Positive</i>
					<svg
						className="sentIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="7"
						height="7"
						viewBox="0 0 24 24"
						fill="#53c653"
					>
						<circle cx="12" cy="12" r="12" />
					</svg>
					<i className="sentLegend">Neutral</i>
					<svg
						className="sentIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="7"
						height="7"
						viewBox="0 0 24 24"
						fill="#3fb0cf"
					>
						<circle cx="12" cy="12" r="12" />
					</svg>
					<i className="sentLegend">Negative</i>
					<svg
						className="sentIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="7"
						height="7"
						viewBox="0 0 24 24"
						fill="#e0544a"
					>
						<circle cx="12" cy="12" r="12" />
					</svg>
					<i className="sentLegend">Mixed</i>
					<svg
						className="sentIcon"
						xmlns="http://www.w3.org/2000/svg"
						width="7"
						height="7"
						viewBox="0 0 24 24"
						fill="#ffff66"
					>
						<circle cx="12" cy="12" r="12" />
					</svg>
					<svg viewBox="0 0 500 200">
						<VictoryPie
							colorScale={["#53c653", "#e0544a", "#3fb0cf", "#ffff66"]}
							standalone={false}
							width={400}
							height={200}
							data={[
								{ x: pre[0] + "%", y: values[0] },
								{ x: pre[1] + "%", y: values[1] },
								{ x: pre[2] + "%", y: values[2] },
								{ x: pre[3] + "%", y: values[3] },
							]}
							innerRadius={90}
							labelRadius={60}
							style={{ labels: { fontSize: 14, fill: "black" } }}
						/>
					</svg>
				</div>
			);
		}
	}
}

export default Sent;
