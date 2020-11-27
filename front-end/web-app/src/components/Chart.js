import React, { useRef, useEffect } from 'react';
import Title from './Title';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


const CHART_ID = 'chart';

export default function Chart(props) {
  const chartRef= useRef(null);
  const chartID = props.chartID
  const data = props.data
  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = am4core.create(CHART_ID, am4charts.XYChart);
      
      chartRef.current.data = data;

      // Add X Axis
      let xAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
      xAxis.renderer.grid.template.strokeOpacity = 0;
      xAxis.renderer.minGridDistance = 50;
      xAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
      xAxis.renderer.labels.template.fontSize = 14;
      xAxis.title.text = "DateTime";

      // Add Y Axis
      let yAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
      yAxis.renderer.grid.template.stroke = am4core.color('#f0f2fa');
      yAxis.renderer.grid.template.strokeOpacity = 1;
      yAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
      yAxis.renderer.labels.template.fontSize = 14;
      yAxis.title.text = "Celsium";
      
      // Create series
      let series = chartRef.current.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "datetime";
      series.name = "Weather";
      series.strokeWidth = 1; // 3px
      //series.stroke = am4core.color("#ff0000"); // red
      series.smoothing = "monotoneX";
      
      // Series tooltip
      series.tooltipText = '{dateX}: [bold]{valueY}[/]';
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

      // // Disable axis tooltips
      // xAxis.cursorTooltipEnabled = false;
      yAxis.cursorTooltipEnabled = false;

      // // Disable zoom
      // chartRef.current.cursor.behavior = 'none';
    }

    // Create scrollbars
      chartRef.current.scrollbarX = new am4core.Scrollbar();
      chartRef.current.scrollbarY = new am4core.Scrollbar();

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
      <div id={chartID || CHART_ID }  style={{ width: "100%", height: "100%" }}></div>
    </React.Fragment>
  );
}
