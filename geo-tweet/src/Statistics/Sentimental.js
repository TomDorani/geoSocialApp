import React, { useState } from "react";
import { VictoryBar ,VictoryChart , Bar , VictoryAxis , VictoryStack , VictoryLabel , VictoryPie  } from 'victory';
import "../CSS/Drawer.css";




class Sent extends React.Component {


    render() {
      const values = [10 , 20 , 30];
      const pre = values;
      var sum  = values[0] + values[1] + values[2];
      pre[0] = Math.round(values[0]/sum*100);
      pre[1] = Math.round(values[1]/sum*100);
      pre[2] = 100 - values[0] - values[1];

      return (
        <div>
          <h4>{this.props.country}</h4>
          <i className = "sentLegend">Positive</i>
          <svg className = "sentIcon" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 24 24" fill = "#53c653"><circle cx="12" cy="12" r="12"/></svg>
          <i className = "sentLegend">Neutral</i>
          <svg className = "sentIcon" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 24 24" fill = "#d6d6c2"><circle cx="12" cy="12" r="12"/></svg>
          <i className = "sentLegend">Negative</i>
          <svg className = "sentIcon" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 24 24" fill = "#e0544a"><circle cx="12" cy="12" r="12"/></svg>
        <svg viewBox="0 0 500 200">
          <VictoryPie
            colorScale={["#53c653", "#d6d6c2", "#e0544a" ]}
            standalone={false}
            width={400} height={200}
            data={[
              { x: pre[0]+"%", y: values[0] }, { x: pre[1]+"%", y: values[1] }, { x: pre[2]+"%", y: values[2] }
            ]}
            innerRadius={90} labelRadius={60}
            style={{ labels: { fontSize: 14, fill: "black" }                
        }}
          />
        </svg>
        </div>
      );
    }
  }
  
  export default Sent;
