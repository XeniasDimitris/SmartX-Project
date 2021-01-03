import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);



export default function Chart(props) {
  const chartRef= useRef(null);
  const chartID = props.chartID
  const data = props.data

  useEffect(() => {
    
    if (!chartRef.current) {
      
      chartRef.current = am4core.create(chartID, am4charts.XYChart);
      chartRef.current.data = props.data
      chartRef.current.colors.step = 2;

      //--------------------------
      // Add X Axis 
      //--------------------------
      let xAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
      xAxis.renderer.grid.template.strokeOpacity = 0;
      xAxis.renderer.minGridDistance = 50;
      xAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
      xAxis.renderer.labels.template.fontSize = 14;
      xAxis.title.text = "DateTime";
      
      //--------------------------
      // Add Y Axis
      //--------------------------
      var yAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
      yAxis.renderer.grid.template.stroke = am4core.color('#f0f2fa');
      yAxis.renderer.labels.template.fill = am4core.color('#ced1e0');
      yAxis.renderer.labels.template.fontSize = 14;
      yAxis.renderer.grid.template.strokeOpacity = 1;
      yAxis.title.text = 'Vehicles';
      yAxis.cursorTooltipEnabled = false;



      function createSeries(field, name, opposite ) {
        
        //--------------------------
        // Create Series
        //--------------------------
        var series = chartRef.current.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "datetime";
        series.strokeWidth = 0.5; // 3px
        series.yAxis = yAxis;
        series.name = name;
        series.showOnInit = true;
        series.fillOpacity = 0.1;
        series.connect = false
        series.autoGapCount = 40
        
        //--------------------------
        // Series tooltip
        //--------------------------

        series.tooltipText = 'date: {dateX}\n {name}: [bold]{valueY}[/]';
        series.tooltip.pointerOrientation = 'down';
        series.tooltip.dy = -5;

      }
      
      createSeries('sum','Vehicles', false);

      //--------------------------
      // Add cursor
      //--------------------------
      chartRef.current.cursor = new am4charts.XYCursor();
      
      //--------------------------
      // Disable axis lines
      //--------------------------
      chartRef.current.cursor.lineX.disabled = true;
      chartRef.current.cursor.lineY.disabled = true;
      
      //--------------------------
      // Disable zoom
      //--------------------------
      
      // chartRef.current.cursor.behavior = 'none';
    }

      //--------------------------
      // Create scrollbars
      //--------------------------
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
      <div id={chartID}  style={{ width: "100%", height: '600px' }}></div>
    </React.Fragment>
  );
}
