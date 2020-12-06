import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


export default function PieChart(props) {
  const chartRef= useRef(null);
  const chartID = props.chartID
  const data = props.data
  console.log(data)

  useEffect(() => {
    
    if (!chartRef.current) {
      
        chartRef.current = am4core.create(chartID, am4charts.PieChart);
        chartRef.current.data = data;
        
        //---------------------
        // Create Series
        //---------------------
        let pieSeries = chartRef.current.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = props.category;
        
        //---------------------
        // Disable ticks and labels
        //---------------------
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;


        }

        chartRef.current.legend = new am4charts.Legend();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = data;
    }
  }, [data]);


  useEffect(() => {
    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);


  return (
    
    <React.Fragment>
      <div id={chartID}  style={{ width: "100%", height: "100%" }}></div>
    </React.Fragment>
  );
}
