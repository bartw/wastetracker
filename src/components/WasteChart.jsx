import React from "react";
import { HorizontalBar } from "react-chartjs-2";
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

    this.calculateData = () => {
      const itemsByProperty = _(this.props.items).groupBy(
        this.state.chartProperty.key
      );
      const labels = itemsByProperty.keys().value();
      const totalsPerGroup = itemsByProperty
        .values()
        .map(items => items.reduce((sum, item) => sum + item.duration, 0))
        .value();

      return {
        labels: labels,
        datasets: [
          {
            label: "Waste",
            data: totalsPerGroup
          }
        ]
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
    return (
      <div>
        <fieldset>
          {chartPropertyRadioButtons}
        </fieldset>
        <HorizontalBar data={this.calculateData} />
      </div>
    );
  }
}
