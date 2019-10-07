import React from 'react';
import '../../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  LabelSeries,
  VerticalBarSeries,
} from 'react-vis';

const InputChart = ({ payload }) => {
  const data = [];
  const chartWidth = 800;
  const chartHeight = 500;

  for (const item of payload) {
    const author = item.author;

    data.push({
      x: author.firstName + ' ' + author.lastName,
      y: item.counter,
    });
  }

  return (
    <XYPlot
      xType="ordinal"
      width={chartWidth}
      height={chartHeight}
      yDomain={[0, 40]}
    >
      <XAxis />
      <YAxis />
      <VerticalBarSeries data={data} />
      <LabelSeries
        data={data.map(obj => {
          return { ...obj, label: obj.y.toString() };
        })}
        labelAnchorX="middle"
        labelAnchorY="text-after-edge"
      />
    </XYPlot>
  );
};

export default InputChart;
