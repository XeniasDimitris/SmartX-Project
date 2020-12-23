import React, { useRef, useEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {transform_data_heat} from './utils' 

am4core.useTheme(am4themes_animated);




export default function Chart(props) {
  const chartRef= useRef(null);
  const chartID = props.chartID
  const data = transform_data_heat(props.data)

  useEffect(() => {
    
    if (!chartRef.current) {
        chartRef.current = am4core.create(chartID, am4charts.XYChart);
        let chart = chartRef.current
        chart.data = data;

        chart.maskBullets = false;
        chart.data = data
        var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

        xAxis.dataFields.category = "month";
        yAxis.dataFields.category = "date";

        xAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.minGridDistance = 40;

        yAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.inversed = true;
        yAxis.renderer.minGridDistance = 30;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "month";
        series.dataFields.categoryY = "date";
        series.dataFields.value = "value";
        series.sequencedInterpolation = true;
        series.defaultState.transitionDuration = 3000;

        var bgColor = new am4core.InterfaceColorSet().getFor("background");

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 1;
        columnTemplate.strokeOpacity = 0.2;
        columnTemplate.stroke = bgColor;
        columnTemplate.tooltipText = "{month}, {date}: {value.workingValue.formatNumber('#.##')}";
        columnTemplate.width = am4core.percent(100);
        columnTemplate.height = am4core.percent(100);

        series.heatRules.push({
        target: columnTemplate,
        property: "fill",
        min: am4core.color(bgColor),
        max: chart.colors.getIndex(0)
        });

        // heat legend
        var heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
        heatLegend.width = am4core.percent(100);
        heatLegend.series = series;
        heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
        heatLegend.valueAxis.renderer.minGridDistance = 30;

        // heat legend behavior
        series.columns.template.events.on("over", function(event) {
        handleHover(event.target);
        })

        series.columns.template.events.on("hit", function(event) {
        handleHover(event.target);
        })

        function handleHover(column) {
        if (!isNaN(column.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
        }
        else {
            heatLegend.valueAxis.hideTooltip();
        }
        }

        series.columns.template.events.on("out", function(event) {
        heatLegend.valueAxis.hideTooltip();
        })

        
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
