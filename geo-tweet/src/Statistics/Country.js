import React, { useState } from "react";
import { VictoryBar ,VictoryChart , Bar , VictoryAxis , VictoryStack , VictoryLabel , VictoryPie  } from 'victory';
import ReactDOM from 'react-dom'
import Sent from "./Sentimental"
import "../CSS/Drawer.css";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";




const countries = ["United States" , "Brazil" , "Canada" , "Russia" , "Australia"];
const sizes = [100000 , 20000 , 30000 , 20000, 10000]




class Country extends React.Component {
    constructor() {
      super();
      this.state = {
        clicked: false,
        bar : '',
        style: {
          data: { fill: "tomato" }
        }
      };
    }
  
    render() {

      const clicked = (e) => {
          console.log("hey click",e);
          console.log("bar" , e.nativeEvent.originalTarget.attributes[2].nodeValue);
          this.state.clicked = true;
          this.state.bar = countries[e.nativeEvent.originalTarget.attributes[2].nodeValue];
          this.forceUpdate()
      };

      const handleChange = (panel) => (event, isExpanded) => {

        this.state.clicked = false;
        this.forceUpdate()

      };
  

      if(this.state.clicked == false){
      return (
        <div className= "chart">
   <VictoryChart domainPadding={30} padding={{ left: 80, right: 100 , bottom :50 , top : 20}} height = {385} width={550}>

  <VictoryBar 
    
    cornerRadius={{ topLeft: (10 )}}
    style={{
        data: {
          fill: "#1da1f2",
          width: 25
        }
      }}
    categories={{
      x: countries
    }}
    data={[
      {x: countries[0], y: sizes[0]},
      {x: countries[1], y: sizes[1]},
      {x: countries[2], y: sizes[2]},
      {x: countries[3], y: sizes[3]},
      {x: countries[4], y: sizes[4]}

    ]}
    events={[
        {
          target: "data",
          eventHandlers: {
            onClick: (e) => {
                clicked(e);
            },
        }}]}
  />
</VictoryChart>
        </div>
      )}
      else{

        this.state.clicked = false;
        return(
          <div >
            <div className="sntBtn">
          <IconButton  onClick={handleChange()} style={{ color: "grey" }}>
              <ChevronLeftIcon  />						
          </IconButton>
          </div>
          <Sent className = "sentGraph" country = {this.state.bar} ></Sent>
          </div>
        )
      }
      ;
    }
   }
  
    export default Country;
  