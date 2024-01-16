import React, { useState } from "react";
import { useGamblingStore } from "@/src/lib/store";
import DisplayActions from "./DisplayActions";

export default function DisplayScreen() {
  const { steps, stepIndex, startNewPos } = useGamblingStore((state) => ({
    steps: state.steps,
    stepIndex: state.stepIndex,
    startNewPos: state.startNewPos,
  }));

  const [positionAmount, setPositionAmount] = useState<number>(420);
  const [stockPrice, setStockPrice] = useState<number>(69);

  const handleStartNewPos = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the values are valid numbers
    if (!isNaN(positionAmount) && !isNaN(stockPrice)) {
      startNewPos(positionAmount, stockPrice);
      // Reset input fields after starting new position
      setPositionAmount(0);
      setStockPrice(0);
    } else {
      alert("Invalid input. Please enter valid numbers.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <code className="font-mono font-bold">display screen</code>
      <form onSubmit={handleStartNewPos} className="mb-8">
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
            stepIndex > 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          disabled={stepIndex > 0} // Disable button if stepIndex is greater than 0
        >
          Start TSP
        </button>
      </form>
      <h1>Current State:</h1>
      <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
      {stepIndex > 0 && <DisplayActions />}
    </main>
  );
}

// import { useGamblingStore } from "@/src/lib/store";
// import DisplayScreen from "./DisplayScreen";

// export default function DisplayActions() {
//   const { steps, stepIndex, startNewPos } = useGamblingStore((state) => ({
//     steps: state.steps,
//     stepIndex: state.stepIndex,
//     startNewPos: state.startNewPos,
//   }));

//   const handleStartNewPos = () => {
//     startNewPos(1000, 200);
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <code className="font-mono font-bold">display actions</code>
//       <button
//         className={`${
//           stepIndex > 0
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-700"
//         } text-white font-bold py-2 px-4 rounded`}
//         onClick={handleStartNewPos}
//         disabled={stepIndex > 0} // Disable button if stepIndex is greater than 0
//       >
//         Start new position
//       </button>
//       <h1>Current State:</h1>
//       <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
//       {stepIndex > 0 && <DisplayScreen />}
//     </main>
//   );
// }
