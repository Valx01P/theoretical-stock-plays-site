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
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_POLY_API_KEY || ""; // Ensure apiKey is defined

  const fetchData = async (symbol: string) => {
    try {
      const aggregatesResponse = await getStockAggregates(symbol, apiKey);
      const previousClose = await getPreviousDayClose(symbol, apiKey);

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
        setError(null); // Clear any previous errors
      } else {
        console.error("No results found in the API response.");
      }
    } catch (error: any) {
      console.error("An error happened:", error);

      // Check if the error is a 429 status code (Too Many Requests)
      if (error.response && error.response.status === 429) {
        setError(
          "I'm out of API credits! Please wait 1 minute and try again, maybe."
        );
      } else {
        setError(
          "An error occurred. Possible wrong format. Correct Format Example: TSLA"
        );
      }
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
    fetchData("SPY");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center">
      <h1 className="mb-8">
        {chartType === "bar" ? "Candlestick Chart" : "Line Chart"} -{" "}
        {tickerSymbol}
      </h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={tickerSymbol}
          onChange={(e) => setTickerSymbol(e.target.value)}
          placeholder="Enter stock symbol"
          className="p-2 text-black"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
          Search
        </button>
      </form>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={toggleChartType}
        className="mb-4 p-2 bg-green-500 text-white"
      >
        Switch to {chartType === "bar" ? "Line" : "Bar"} Chart
      </button>
      <button
        onClick={toggleChartView}
        className="mb-4 p-2 bg-yellow-500 text-white"
      >
        Switch to {enhanced === "enhanced" ? "Standard" : "Enhanced"} Chart
      </button>
      <ResponsiveContainer width="80%" height={500} style={{ margin: "auto" }}>
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
        <p className="mt-8">
          Last Trading Day Closing Price: ${latestPrice.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default CandlestickChart;
