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
        let chart = chartRef.current

        var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
        categoryAxis.title.text = "Date";
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.minGridDistance = 50;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        categoryAxis.renderer.labels.template.fill = am4core.color('#ced1e0');

        var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Vehicles";
        valueAxis.renderer.grid.template.stroke = am4core.color('#f0f2fa');
        valueAxis.renderer.grid.template.strokeOpacity = 1;
        valueAxis.renderer.labels.template.fill = am4core.color('#ced1e0');

        // Create series
        function createSeries(field) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.dateX = "datetime";
          series.name = field;
          series.columns.template.tooltipText = "[bold]{name}[/] -> {dateX}: [bold]{valueY}[/]";
          series.stacked = true;
          series.columns.template.width = am4core.percent(95);
        }

        Object.keys(data[0]).forEach( key =>{
          
          if (key!=='datetime' && key!=='sum'){
            createSeries(key);
          }
        })

        // Add legend
        chart.legend = new am4charts.Legend();

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
