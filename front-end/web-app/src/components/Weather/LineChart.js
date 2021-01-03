import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);



export default function Chart(props) {
  const chartRef= useRef(null);
  const chartID = props.chartID
  const data = props.data
  const measure = props.measure
  
  useEffect(() => {
    
    if (!chartRef.current) {
      
      chartRef.current = am4core.create(chartID, am4charts.XYChart);
      chartRef.current.colors.step = 2;
      chartRef.current.data = data;

      //---------------------------------
      // Add X Axis
      //---------------------------------
      let xAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
      xAxis.renderer.grid.template.strokeOpacity = 0;
      xAxis.renderer.minGridDistance = 50;
      xAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
      xAxis.renderer.labels.template.fontSize = 14;
      xAxis.title.text = "DateTime";
      
      function createAxisAndSeries(field, name, opposite ) {
       
        //---------------------------------
        // Add Y Axis
        //---------------------------------
        var yAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
        
        if(chartRef.current.yAxes.indexOf(yAxis) !== 0){
          yAxis.syncWithAxis = chartRef.current.yAxes.getIndex(0);
        }
        yAxis.renderer.grid.template.stroke = am4core.color('#f0f2fa');
        yAxis.renderer.grid.template.strokeOpacity = 1;
        yAxis.renderer.labels.template.fontSize = 14;
        yAxis.title.text = measure;
        yAxis.renderer.opposite = opposite;
        yAxis.renderer.line.strokeOpacity = 1;
        yAxis.renderer.line.strokeWidth = 2;

        yAxis.cursorTooltipEnabled = false;


        //---------------------------------
        // Create Series
        //---------------------------------
        var series = chartRef.current.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = 'value';
        series.dataFields.dateX = "datetime";
        series.strokeWidth = 0.5; 
        series.name = name;
        series.showOnInit = true;
        series.tensionX = 0.8;
        series.fillOpacity = 0.2;
        series.connect = false
        series.autoGapCount = 40
        

        //---------------------------------
        // Series tooltip
        //---------------------------------
        series.tooltipText = 'date: {dateX}\n value: [bold]{valueY}[/]';
        series.tooltip.pointerOrientation = 'down';
        series.tooltip.dy = -5;
        series.tooltip.background.filters.clear()
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color('#2a2b2e');
        series.tooltip.background.stroke = am4core.color('#2a2b2e');


        yAxis.renderer.labels.template.fill = series.stroke;
        yAxis.renderer.line.stroke = series.stroke;


        //--------------------------------- 
        // Create scrollbars
        //---------------------------------
        var scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        scrollbarX.marginBottom = 20;
        chartRef.current.scrollbarX = scrollbarX;
      }
      
      createAxisAndSeries(props.field, chartID, false);
      
      //---------------------------------
      // Add cursor
      //---------------------------------
      chartRef.current.cursor = new am4charts.XYCursor();

      //---------------------------------
      // Disable axis lines
      //---------------------------------
      chartRef.current.cursor.lineX.disabled = true;
      chartRef.current.cursor.lineY.disabled = true;

      // // Disable zoom
      // chartRef.current.cursor.behavior = 'none';
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
