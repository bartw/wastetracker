import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import _ from 'lodash';

export default function WasteChart({ items }) {
  const itemsByUserName = _(items).groupBy('userName');
  const userNames = itemsByUserName.keys().value();
  const totalsPerUserName = itemsByUserName.values().map(items => items.reduce((sum, item) => sum + item.duration, 0)).value();

  const data = {
    labels: userNames,
    datasets: [
      {
        label: "Waste",
        data: totalsPerUserName
      }
    ]
  };
  
  return (
    <div>
      <HorizontalBar data={data} />
    </div>
  );
}
