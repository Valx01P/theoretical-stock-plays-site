import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useGamblingStore } from '@/src/lib/store';

const LineChart: React.FC = () => {
  const steps = useGamblingStore((state) => state.steps);
  const lastStep = steps[steps.length - 1];

  // Set Highcharts options directly in the chartOptions object
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      width: 720,
      height: 500,
      backgroundColor: '#1a1a1a', // Set background color here
    },
    title: {
      text: 'Position Amount Over Steps',
      style: {
        color: '#ffffff',
      },
    },
    xAxis: {
      categories: steps.map((step) => step.id.toString()),
      title: {
        text: 'Step Index',
        style: {
          color: '#ffffff',
        },
      },
      labels: {
        style: {
          color: '#ffffff',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Position Amount',
        style: {
          color: '#ffffff',
        },
      },
      labels: {
        style: {
          color: '#ffffff',
        },
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
      line: {
        zones: steps.map((step) => ({
          value: step.totalPutIn,
          color:
            lastStep.positionAmount < lastStep.totalPutIn
              ? '#FF0000'
              : lastStep.positionAmount > lastStep.totalPutIn
              ? '#00FF00'
              : '#0000FF',
        })),
      } as Highcharts.PlotLineOptions,
    },
    series: [
      {
        type: 'line',
        name: 'Position Amount',
        data: steps.map((step) => step.positionAmount),
        color:
          lastStep.positionAmount < lastStep.totalPutIn
            ? '#FF0000'
            : lastStep.positionAmount > lastStep.totalPutIn
            ? '#00FF00'
            : '#0000FF',
      } as Highcharts.SeriesLineOptions,
    ],
  };

  return (
    <div className="text-center">
      <h1 className="mb-8">Line Chart - Position Amount Over Steps</h1>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default LineChart;
