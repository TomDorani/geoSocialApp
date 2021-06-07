import React, { useEffect } from "react";
import { VictoryBar, VictoryChart } from "victory";
import Sent from "../Statistics/Sentimental";
import "../CSS/Drawer.css";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Loader from "./../Components/Loader";
import Box from "@material-ui/core/Box";
const countries = [];


const state = {
    clicked: false,
    countries: [],
    countriesData: [],
    bar: "",
    style: {
        data: { fill: "tomato" },
    },
    isloading: true,
};
 

const CountryFunc = (props) => {


    const clicked = (e) => {
        console.log("hey click", e);
        console.log("bar", e.datum.x);
        state({ clicked: true });
        state({
            bar: e.datum.x,
        });

        // this.forceUpdate();
    };

    const handleChange = (panel) => (event, isExpanded) => {
        state({ clicked: false });
        // this.forceUpdate();
    };

    let coData = [];

    useEffect(() => {
    const query = async () => {
		fetch(
			`https://ancient-retreat-48472.herokuapp.com/api/country?search=${props.search}`
		)
			.then((response) => response.json())
			.then((res) => {
				state({ countries: res });
				console.log("country " + state.countries);
				state.countries.forEach(element => {
					coData.push({x: element[0],
							y: element[1],},)
				});
				console.log("coData " + coData);
				state({ countriesData: coData });

				state({ isloading: false });
			});

    };

    query();

}, []);




		if (state.isloading) {
			return (
				<Box>
					<Loader loading={state.isloading} />
				</Box>
			);
		} else if (state.clicked === false && state.countries[0]) {
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
						search={props.search}
						country={state.bar}
						flag="country"
					></Sent>
				</Box>
			);
		}
    }
export default CountryFunc;
