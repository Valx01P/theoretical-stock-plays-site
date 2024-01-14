import { restClient } from "@polygon.io/client-js";
import axios from "axios";

const getStockAggregates = async (tickerSymbol: string) => {
  const rest = restClient(process.env.POLY_API_KEY);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);

  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  try {
    const aggregatesData = await rest.stocks.aggregates(
      tickerSymbol,
      1,
      "week",
      formattedStartDate,
      formattedEndDate
    );

    return {
      aggregates: aggregatesData.results,
    };
  } catch (error) {
    console.error("An error happened:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

const getPreviousDayClose = async (symbol: string) => {
  // Replace with your Polygon API key
  const apiKey = process.env.POLY_API_KEY;
  // Polygon API base URL
  const baseUrl = "https://api.polygon.io/v2/aggs/ticker";

  // Get the current date
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Calculate timestamps for the previous day
  const endDate = new Date(today.getTime());
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  const startDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const startTimestamp = Math.floor(startDate.getTime() / 1000);

  // Define query parameters
  const queryParams = {
    apiKey,
    adjusted: true, // Adjusted for splits by default, you can change this if needed
    limit: 1,
    sort: "desc",
    timestamp: { $gte: startTimestamp, $lte: endTimestamp },
  };

  // Construct the API URL
  const url = `${baseUrl}/${symbol}/prev`;

  try {
    // Make the API request
    const response = await axios.get(url, { params: queryParams });
    // Get the previous day's closing price
    const previousClose = response.data.results[0]?.c;
    return parseFloat(previousClose);
  } catch (error) {
    console.error("An error happened:", error);
    throw error;
  }
};

export { getPreviousDayClose };
export default getStockAggregates;
