import React, { useRef, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Title from './Title';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const data = [
  {
    year: "1990",
    population: 730830065,
  },
  {
    year: "1995",
    population: 732194921,
  },
  {
    year: "2000",
    population: 735281836,
  },
  {
    year: "2005",
    population: 736717375,
   },
   {
    year: "2010",
    population: 743090810,
   },
   {
    year: "2018",
    population: 751612093,
   },
];

const CHART_ID = 'population_chart';

export default function Chart() {
  const chartRef= useRef(null);

  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = am4core.create(CHART_ID, am4charts.XYChart);
      
      chartRef.current.data = data;

      // Add X Axis
      let xAxis = chartRef.current.xAxes.push(new am4charts.CategoryAxis());
      xAxis.dataFields.category = "year";
      xAxis.renderer.cellStartLocation = 0.1;
      xAxis.renderer.cellEndLocation = 0.9;
      xAxis.renderer.grid.template.strokeOpacity = 0;
      xAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
      xAxis.renderer.labels.template.fontSize = 12;

      // Add Y Axis
      let yAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
      yAxis.renderer.grid.template.stroke = am4core.color('#f0f2fa');
      yAxis.renderer.grid.template.strokeOpacity = 1;
      yAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
      yAxis.renderer.labels.template.fontSize = 12;
      
      // Create series
      let series = chartRef.current.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "population";
      series.dataFields.categoryX = "year";
      series.name = "Population";
      series.fillOpacity = 1;
      series.fill = am4core.color('#e5408f');
      series.strokeWidth = 0;
      series.columns.template.column.cornerRadiusTopLeft = 5;
      series.columns.template.column.cornerRadiusTopRight = 5;
      
      // Series tooltip
      series.tooltipText = '{categoryX}: [bold]{valueY}[/]';
      series.tooltip.pointerOrientation = 'down';
      series.tooltip.dy = -5;
      series.tooltip.background.filters.clear()
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color('#2a2b2e');
      series.tooltip.background.stroke = am4core.color('#2a2b2e');


      // Add cursor
      chartRef.current.cursor = new am4charts.XYCursor();

      // Disable axis lines
      chartRef.current.cursor.lineX.disabled = true;
      chartRef.current.cursor.lineY.disabled = true;

      // Disable axis tooltips
      xAxis.cursorTooltipEnabled = false;
      yAxis.cursorTooltipEnabled = false;

      // Disable zoom
      chartRef.current.cursor.behavior = 'none';
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
      <Title>Today</Title>
        <div id={CHART_ID}  style={{ width: "100%", height: "100%" }}></div>
    </React.Fragment>
  );
}
