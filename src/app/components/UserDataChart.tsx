import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGamblingStore } from "@/src/lib/store";

Highcharts.setOptions({
  chart: {
    backgroundColor: "#1a1a1a",
  },
  title: {
    style: {
      color: "#ffffff",
    },
  },
  xAxis: {
    labels: {
      style: {
        color: "#ffffff",
      },
    },
  },
  yAxis: {
    labels: {
      style: {
        color: "#ffffff",
      },
    },
  },
});

const LineChart: React.FC = () => {
  const steps = useGamblingStore((state) => state.steps);
  const lastStep = steps[steps.length - 1];

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "line",
      width: 720,
      height: 500,
    },
    title: {
      text: "Position Amount Over Steps",
    },
    xAxis: {
      categories: steps.map((step) => step.id.toString()),
      title: {
        text: "Step Index",
      },
    },
    yAxis: {
      title: {
        text: "Position Amount",
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
              ? "#FF0000"
              : lastStep.positionAmount > lastStep.totalPutIn
              ? "#00FF00"
              : "#0000FF",
        })),
      } as Highcharts.PlotLineOptions,
    },
    series: [
      {
        type: "line",
        name: "Position Amount",
        data: steps.map((step) => step.positionAmount),
        color:
          lastStep.positionAmount < lastStep.totalPutIn
            ? "#FF0000"
            : lastStep.positionAmount > lastStep.totalPutIn
            ? "#00FF00"
            : "#0000FF",
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
