import React from "react";
import { Bar } from "react-chartjs-2";
import _ from "lodash";

export default class WasteChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartProperties = [
      { key: "userName", label: "user name" },
      { key: "type", label: "type" }
    ];

    this.state = {
      chartProperty: this.chartProperties[1]
    };

    this.onChangeChartProperty = e => {
      this.setState({
        chartProperty: this.chartProperties.find(
          chartProperty => chartProperty.key === e.target.value
        )
      });
    };

    this.calculateChart = () => {
      const itemsByProperty = _(this.props.items).groupBy(
        this.state.chartProperty.key
      );
      const labels = itemsByProperty.keys().value();
      const totalsPerGroup = itemsByProperty
        .values()
        .map(items => items.reduce((sum, item) => sum + item.duration, 0))
        .value();

      return {
        data: {
          labels: labels,
          datasets: [
            {
              label: "Waste",
              data: totalsPerGroup
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };
    };
  }

  render() {
    const chartPropertyRadioButtons = this.chartProperties.map(chartProperty =>
      <label key={chartProperty.key}>
        <input
          name="chartProperty"
          type="radio"
          value={chartProperty.key}
          checked={this.state.chartProperty.key === chartProperty.key}
          onChange={this.onChangeChartProperty}
        />
        {chartProperty.label}
      </label>
    );
    const chart = this.calculateChart();

    return (
      <div>
        <fieldset>
          {chartPropertyRadioButtons}
        </fieldset>
        <Bar data={chart.data} options={chart.options} />
      </div>
    );
  }
}
