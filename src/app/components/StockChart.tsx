"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";
import getStockAggregates from "@/src/services/polygonApiService";
import { getPreviousDayClose } from "@/src/services/polygonApiService";

interface StockData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

const CustomBar = (props: any) => {
  const { x, y, width, height, fill, payload } = props;
  const isBullish = payload.open <= payload.close;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={isBullish ? "green" : "red"}
    />
  );
};

const CandlestickChart: React.FC = () => {
  const [enhanced, setEnhanced] = useState<string>("enhanced");
  const [chartData, setChartData] = useState<StockData[]>([]);
  const [tickerSymbol, setTickerSymbol] = useState<string>("");
  const [chartType, setChartType] = useState<string>("bar");
  const [latestPrice, setLatestPrice] = useState<number | null>(null);

  const fetchData = async (symbol: string) => {
    try {
      const aggregatesResponse = await getStockAggregates(symbol);
      const previousClose = await getPreviousDayClose(symbol);

      if (aggregatesResponse.aggregates) {
        const data: StockData[] = aggregatesResponse.aggregates.map(
          (result: any) => ({
            date: new Date(result.t),
            open: result.o,
            high: result.h,
            low: result.l,
            close: result.c,
          })
        );

        setChartData(data);
        setLatestPrice(previousClose);
        setTickerSymbol(symbol);
      } else {
        console.error("No results found in the API response.");
      }
    } catch (error) {
      console.error("An error happened:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(tickerSymbol);
  };

  const toggleChartType = () => {
    setChartType((prevType) => (prevType === "bar" ? "line" : "bar"));
  };

  const toggleChartView = () => {
    setEnhanced((prevView) =>
      prevView === "enhanced" ? "standard" : "enhanced"
    );
  };

  useEffect(() => {
    // Fetch default data on component mount
    fetchData("SPY");
  }, []);

  return (
    <div>
      <h1>
        {chartType === "bar" ? "Candlestick Chart" : "Line Chart"} -{" "}
        {tickerSymbol}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tickerSymbol}
          onChange={(e) => setTickerSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          style={{ color: "black" }}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={toggleChartType}>
        Switch to {chartType === "bar" ? "Line" : "Bar"} Chart
      </button>
      <button onClick={toggleChartView} className="block">
        Switch to {enhanced === "enhanced" ? "Standard" : "Enhanced"} Chart
      </button>
      <ResponsiveContainer width="80%" height={500}>
        {chartType === "bar" ? (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            {enhanced === "enhanced" ? (
              <YAxis domain={["dataMin", "dataMax"]} />
            ) : (
              <YAxis />
            )}
            <Tooltip />
            <Legend />
            <Bar dataKey="low" shape={<CustomBar />} />
            <Bar dataKey="high" shape={<CustomBar />} />
            <Bar dataKey="open" shape={<CustomBar />} />
            <Bar dataKey="close" shape={<CustomBar />} />
          </BarChart>
        ) : (
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            {enhanced === "enhanced" ? (
              <YAxis domain={["dataMin", "dataMax"]} />
            ) : (
              <YAxis />
            )}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="low" stroke="blue" />
            <Line type="monotone" dataKey="high" stroke="green" />
            <Line type="monotone" dataKey="open" stroke="orange" />
            <Line type="monotone" dataKey="close" stroke="red" />
          </LineChart>
        )}
      </ResponsiveContainer>
      {latestPrice !== null && (
        <p>Last Trading Day Closing Price: ${latestPrice.toFixed(2)}</p>
      )}
    </div>
  );
};

export default CandlestickChart;
