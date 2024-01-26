import React, { useState } from "react";
import { useGamblingStore } from "@/src/lib/store";
import DisplayActions from "./DisplayActions";

export default function DisplayScreen() {
  const { stepIndex, startNewPos } = useGamblingStore((state) => ({
    stepIndex: state.stepIndex,
    startNewPos: state.startNewPos,
  }));

  const [positionAmount, setPositionAmount] = useState<number>(0);
  const [stockPrice, setStockPrice] = useState<number>(0);

  const isStartButtonDisabled =
    stepIndex > 0 ||
    isNaN(positionAmount) ||
    isNaN(stockPrice) ||
    positionAmount <= 0 ||
    stockPrice <= 0;

  const handleStartNewPos = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStartButtonDisabled) {
      startNewPos(positionAmount, stockPrice);
      setPositionAmount(0);
      setStockPrice(0);
    } else {
      alert(
        "Invalid input. Please enter valid numbers and ensure positionAmount is greater than or equal to stockPrice."
      );
    }
  };

  return (
    <>
      <div className="w-full relative bg-gray-900">
        <div className="pt-2 ring-2 bg-gray-900 animate-pulse"></div>
      </div>
      <main className="flex min-h-screen flex-col items-center p-24 bg-gray-800">
        <code className="font-mono font-bold">display screen</code>
        {stepIndex === 0 && ( // Conditionally render the form only if stepIndex is 0
          <form onSubmit={handleStartNewPos} className="my-16">
            <label>
              Investing{" "}
              <input
                type="number"
                value={positionAmount}
                onChange={(e) => setPositionAmount(parseFloat(e.target.value))}
                placeholder="Position amount"
                className="p-2 text-black"
                required
              />
            </label>{" "}
            into theoretical stock @
            <input
              type="number"
              value={stockPrice}
              onChange={(e) => setStockPrice(parseFloat(e.target.value))}
              placeholder="Stock price"
              className="p-2 text-black"
              required
            />
            <button
              type="submit"
              className={`${
                isStartButtonDisabled
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded`}
              disabled={isStartButtonDisabled} // Disable button if conditions are not met
            >
              Start TSP
            </button>
          </form>
        )}
        {stepIndex > 0 && <DisplayActions />}
      </main>
      <div className="w-full relative bg-gray-800">
        <div className="pt-2 ring-2 bg-gray-800 animate-pulse"></div>
      </div>
    </>
  );
}
