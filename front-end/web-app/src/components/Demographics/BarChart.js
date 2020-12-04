import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


export default function BarChart(props) {
  const chartRef= useRef(null);
  const chartID = props.chartID
  const data = props.data

  useEffect(() => {
    
    if (!chartRef.current) {
        
        chartRef.current = am4core.create(chartID, am4charts.XYChart);
        chartRef.current.data = data;
        
        let categoryAxis = chartRef.current.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = props.category;

        // Create Series
        var series = chartRef.current.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = props.category;
        series.columns.template.tooltipText = "Category: {categoryX}\nValue: {valueY}";

    }

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
