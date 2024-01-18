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
        <div>
          <label>
            Increase By:
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
        <div>
          <label>
            Decrease By:
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
        <div>
          <label>
            Stock Price:
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
        <h1>Current State:</h1>
        <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
      </main>
    </>
  );
}
