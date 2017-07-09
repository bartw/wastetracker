import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import _ from 'lodash';

export default function WasteChart({ items, propertyToGroupBy }) {
  const itemsByProperty = _(items).groupBy(propertyToGroupBy);
  const labels = itemsByProperty.keys().value();
  const totalsPerGroup = itemsByProperty.values().map(items => items.reduce((sum, item) => sum + item.duration, 0)).value();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Waste",
        data: totalsPerGroup
      }
    ]
  };
  
  return (
    <div>
      <HorizontalBar data={data} />
    </div>
  );
}
