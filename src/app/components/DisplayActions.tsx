import React, { useState } from "react";
import { useGamblingStore } from "@/src/lib/store";
import LineChart from "./UserDataChart";

export default function DisplayActions() {
  const {
    steps,
    stepIndex,
    increasePos,
    decreasePos,
    simulateStockPriceChange,
    sellEntirePos,
    goBack,
  } = useGamblingStore((state) => ({
    steps: state.steps,
    stepIndex: state.stepIndex,
    increasePos: state.increasePos,
    decreasePos: state.decreasePos,
    simulateStockPriceChange: state.simulateStockPriceChange,
    sellEntirePos: state.sellEntirePos,
    goBack: state.goBack,
  }));

  const [increaseAmount, setIncreaseAmount] = useState<number>(0);
  const [decreaseAmount, setDecreaseAmount] = useState<number>(0);
  const [stockPrice, setStockPrice] = useState<number>(0);

  const handleAction = (action: () => void) => {
    action();
    console.log(steps);
  };

  // Get the previous step
  const previousStep = steps[stepIndex - 1];

  // Get the current step id, dynamically changes with every new step
  const id = stepIndex - 1;

  const isIncreaseButtonDisabled =
    stepIndex === 0 || increaseAmount <= 0 || isNaN(increaseAmount);
  const isDecreaseButtonDisabled =
    stepIndex === 0 ||
    isNaN(decreaseAmount) ||
    decreaseAmount <= 0 ||
    decreaseAmount > previousStep?.positionAmount;
  const isStockButtonDisabled =
    stepIndex === 0 || stockPrice < 0 || isNaN(stockPrice);
  const isSellButtonDisabled =
    stepIndex === 0 || previousStep?.status === "COMPLETED";

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-gray-900">
        <LineChart />
        <code className="font-mono font-bold">display actions</code>
        <div className="flex space-x-4 mb-8">
          <button
            className={`${
              stepIndex < 0 || isIncreaseButtonDisabled || isSellButtonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleAction(() => increasePos(id, increaseAmount))}
            disabled={isIncreaseButtonDisabled || isSellButtonDisabled}
          >
            Increase Pos
          </button>
          <button
            className={`${
              stepIndex < 0 || isDecreaseButtonDisabled || isSellButtonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleAction(() => decreasePos(id, decreaseAmount))}
            disabled={isDecreaseButtonDisabled || isSellButtonDisabled}
          >
            Decrease Pos
          </button>
          <button
            className={`${
              stepIndex < 0 || isStockButtonDisabled || isSellButtonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() =>
              handleAction(() => simulateStockPriceChange(id, stockPrice))
            }
            disabled={isStockButtonDisabled || isSellButtonDisabled}
          >
            Update Stock Price
          </button>
          <button
            className={`${
              stepIndex < 0 || isSellButtonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleAction(() => sellEntirePos(id))}
            disabled={isSellButtonDisabled}
          >
            Sell Entire Pos
          </button>
          <button
            className={`${
              stepIndex < 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleAction(() => goBack())}
            disabled={stepIndex === 0}
          >
            Back
          </button>
        </div>
        {/* Input sections vvv */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <label className="bg-green-200 p-3 w-full text-black rounded">
              <strong>Increase By:</strong>
              <input
                type="number"
                value={increaseAmount}
                onChange={(e) => setIncreaseAmount(parseFloat(e.target.value))}
                placeholder="Increase Amount"
                className="p-2 text-black"
                required
              />
            </label>
          </div>
          <div className="flex justify-between">
            <label className="bg-red-200 p-3 text-black rounded">
              <strong>Decrease By:</strong>
              <input
                type="number"
                value={decreaseAmount}
                onChange={(e) => setDecreaseAmount(parseFloat(e.target.value))}
                placeholder="Decrease Amount"
                className="p-2 text-black"
                required
              />
            </label>
          </div>
          <div className="flex justify-between">
            <label className="bg-purple-300 p-3 w-full text-black rounded">
              <strong>Stock Price:</strong>
              <input
                type="number"
                value={stockPrice}
                onChange={(e) => setStockPrice(parseFloat(e.target.value))}
                placeholder="Updated Stock Price"
                className="p-2 text-black"
                required
              />
            </label>
          </div>
        </div>
        <h1>Current State:</h1>
        <table className="table-auto bg-orange-200 text-black m-4 p-4 rounded-md">
          <thead>
            <tr>
              <th className="border p-2 bg-slate-600">Step</th>
              <th className="border p-2 bg-gray-500">Status</th>
              <th className="border p-2 bg-green-200">Position Value</th>
              <th className="border p-2 bg-purple-300">Stock Price</th>
              <th className="border p-2 bg-blue-300">Shares</th>
              <th className="border p-2 bg-pink-300">Total Profit</th>
              <th className="border p-2 bg-red-200">Decreased By</th>
              <th className="border p-2 bg-green-200">Increased By</th>
              <th className="border p-2 bg-orange-200">Total $ Put In</th>
              {steps.some((step) => step.status === "COMPLETED") && (
                <>
                  <th className="border p-2 bg-violet-300">Total Losses</th>
                  <th className="border p-2 bg-cyan-300">Total Gains</th>
                  <th className="border p-2 bg-fuchsia-300">Profit Sold</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {steps.map((step) => (
              <tr key={step.id}>
                <td className="border p-2 bg-slate-600">{step.id}</td>
                <td className="border p-2 bg-gray-500">{step.status}</td>
                <td className="border p-2 bg-green-200">
                  ${step.positionAmount.toFixed(2)}
                </td>
                <td className="border p-2 bg-purple-300">
                  ${step.stockPrice.toFixed(2)}
                </td>
                <td className="border p-2 bg-blue-300">
                  {step.shares.toFixed(2)}
                </td>
                <td className="border p-2 bg-pink-300">
                  ${step.totalProfit.toFixed(2)}
                </td>
                <td className="border p-2 bg-red-200">
                  ${step.decreasedBy.toFixed(2)}
                </td>
                <td className="border p-2 bg-green-200">
                  ${step.increasedBy.toFixed(2)}
                </td>
                <td className="border p-2 bg-orange-200">
                  ${step.totalPutIn.toFixed(2)}
                </td>
                {step.status === "COMPLETED" && (
                  <>
                    <td className="border p-2 bg-violet-300">
                      ${step.totalLosses.toFixed(2)}
                    </td>
                    <td className="border p-2 bg-cyan-300">
                      ${step.totalGains.toFixed(2)}
                    </td>
                    <td className="border p-2 bg-fuchsia-300">
                      ${step.profitSold.toFixed(2)}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre> */}
      </main>
    </>
  );
}
