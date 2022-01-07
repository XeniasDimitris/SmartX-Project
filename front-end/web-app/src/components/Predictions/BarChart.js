import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
const reform_data = (data) =>{
  let res = [
    {metric: 'mae', value: data['mae']},
    {metric: 'mse', value: data['mse']},
    {metric: 'mape', value: data['mape']}
  ]
  return res
}

export default function BarChart(props) {
  const chartRef= useRef(null);
  const chartID = String(props.chartID)
  const data = reform_data(props.data);
 
  useEffect(() => {
    
    if (!chartRef.current) {
        
        chartRef.current = am4core.create(chartID, am4charts.XYChart);
        chartRef.current.data = data
        let chart = chartRef.current
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());

        categoryAxis.dataFields.category = "metric";
        categoryAxis.title.text = "Metric";
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        categoryAxis.renderer.labels.template.fill = am4core.color('#ced1e0');


        var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Evaluation";
        valueAxis.renderer.grid.template.stroke = am4core.color('#f0f2fa');
        valueAxis.renderer.grid.template.strokeOpacity = 1;
        valueAxis.renderer.labels.template.fill = am4core.color('#ced1e0');

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'value';
        series.dataFields.categoryX = "metric";
        series.name = 'metrics';
        series.columns.template.tooltipText = "[bold]{valueY}[/]";
        series.stacked = true;
        series.columns.template.width = am4core.percent(95);
      


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
