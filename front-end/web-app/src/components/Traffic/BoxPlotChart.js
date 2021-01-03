import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {transform_data_box} from './utils' 

am4core.useTheme(am4themes_animated);


export default function Chart(props) {
  const chartRef= useRef(null);
  const chartID = props.chartID
  const data = transform_data_box(props.data)
  useEffect(() => {
    
    if (!chartRef.current) {
        chartRef.current = am4core.create(chartID, am4charts.XYChart);
        let chart = chartRef.current
        chart.paddingRight = 20;

        chart.data = data
        chart.dateFormatter.inputDateFormat = "MM";

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 40;
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.dateFormatter = new am4core.DateFormatter();
        dateAxis.dateFormats.setKey("month", "MMM");
        dateAxis.periodChangeDateFormats.setKey("month", "MMM"); 

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.title.text = 'Number of Vehicles for each Day';
        var series = chart.series.push(new am4charts.CandlestickSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "q3";
        series.dataFields.openValueY = "q1";
        series.dataFields.lowValueY = "min";
        series.dataFields.highValueY = "max";
        series.simplifiedProcessing = true;
        series.tooltipText = "Max: {highValueY.value}\nQ3: {valueY.value}\nMediana: {median}\nQ1: {openValueY.value}\nMin: {lowValueY.value}";
        series.riseFromOpenState = undefined;
        series.dropFromOpenState = undefined;

        chart.cursor = new am4charts.XYCursor();

        var medianaSeries = chart.series.push(new am4charts.StepLineSeries());
        medianaSeries.noRisers = true;
        medianaSeries.startLocation = 0.1;
        medianaSeries.endLocation = 0.9;
        medianaSeries.dataFields.valueY = "median";
        medianaSeries.dataFields.dateX = "date";
        medianaSeries.strokeWidth = 2;
        medianaSeries.stroke = am4core.color("#fff");


        var topSeries = chart.series.push(new am4charts.StepLineSeries());
        topSeries.noRisers = true;
        topSeries.startLocation = 0.2;
        topSeries.endLocation = 0.8;
        topSeries.dataFields.valueY = "max";
        topSeries.dataFields.dateX = "date";
        topSeries.stroke = chart.colors.getIndex(0);
        topSeries.strokeWidth = 2;

        var bottomSeries = chart.series.push(new am4charts.StepLineSeries());
        bottomSeries.noRisers = true;
        bottomSeries.startLocation = 0.2;
        bottomSeries.endLocation = 0.8;
        bottomSeries.dataFields.valueY = "min";
        bottomSeries.dataFields.dateX = "date";
        bottomSeries.stroke = chart.colors.getIndex(0);
        bottomSeries.strokeWidth = 2;


        chart.scrollbarX = new am4core.Scrollbar();


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
