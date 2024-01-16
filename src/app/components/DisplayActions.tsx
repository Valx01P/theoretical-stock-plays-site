import React, { useState } from "react";
import { useGamblingStore } from "@/src/lib/store";

export default function DisplayActions() {
  const {
    steps,
    stepIndex,
    increasePos,
    // decreasePos,
    // simulateStockPriceChange,
    // sellEntirePos,
    // goBack,
  } = useGamblingStore((state) => ({
    steps: state.steps,
    stepIndex: state.stepIndex,
    increasePos: state.increasePos,
    // decreasePos: state.decreasePos,
    // simulateStockPriceChange: state.simulateStockPriceChange,
    // sellEntirePos: state.sellEntirePos,
    // goBack: state.goBack,
  }));

  const [amount, setAmount] = useState<number>(0);
  // const [price, setPrice] = useState<number>(0);

  const handleAction = (action: () => void) => {
    action();
    console.log(steps);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <code className="font-mono font-bold">display actions</code>
      <div className="flex space-x-4 mb-8">
        <button
          className={`${
            stepIndex < 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={() => handleAction(() => increasePos(stepIndex - 1, 1000))}
          disabled={stepIndex === 0}
        >
          Increase Pos
        </button>
        {/* <button
          className={`${
            stepIndex < 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={() => handleAction(() => decreasePos(stepIndex, 500))}
          disabled={stepIndex === 0}
        >
          Decrease Pos
        </button>
        <button
          className={`${
            stepIndex < 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={() =>
            handleAction(() => simulateStockPriceChange(stepIndex, 420))
          }
          disabled={stepIndex === 0}
        >
          Simulate Price Change
        </button>
        <button
          className={`${
            stepIndex < 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={() =>
            handleAction(() => sellEntirePos(stepIndex, "COMPLETED"))
          }
          disabled={stepIndex === 0}
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
          Go Back
        </button> */}
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Amount"
            className="p-2 text-black"
            required
          />
        </label>
      </div>
      {/* {stepIndex > 0 && (
        <div>
          <label>
            Price:
            <input
              type="number"
              value={price || ""}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="Price"
              className="p-2 text-black"
              required
            />
          </label>
        </div>
      )} */}
      <h1>Current State:</h1>
      <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
    </main>
  );
}

//__________________________________________________________________________________________________________

// import React, { useState } from "react";
// import { useGamblingStore } from "@/src/lib/store";

// export default function DisplayActions() {
//   const { steps, stepIndex, increasePos } = useGamblingStore((state) => ({
//     steps: state.steps,
//     stepIndex: state.stepIndex,
//     increasePos: state.increasePos,
//   }));

//   const [amount, setAmount] = useState<number>(0);

//   const handleIncreasePos = async () => {
//     const currentStep = stepIndex > 0 ? steps[stepIndex - 1] : null;
//     if (currentStep) {
//       console.log("Current Step:", currentStep);
//       await increasePos(currentStep.id, amount); // Wait for the state to update
//     } else {
//       console.error("Current step is undefined");
//     }
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <code className="font-mono font-bold">display actions</code>
//       <div className="flex space-x-4 mb-8">
//         <button
//           className={`${
//             stepIndex < 0
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-700"
//           } text-white font-bold py-2 px-4 rounded`}
//           onClick={handleIncreasePos}
//           disabled={stepIndex === 0}
//         >
//           Increase Pos
//         </button>
//         {/* Other buttons go here */}
//       </div>
//       <div>
//         <label>
//           Amount:
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(parseFloat(e.target.value))}
//             placeholder="Amount"
//             className="p-2 text-black"
//             required
//           />
//         </label>
//       </div>
//       <h1>Current State:</h1>
//       <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
//     </main>
//   );
// }

//-----------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { useGamblingStore } from "@/src/lib/store";

// export default function DisplayActions() {
//   const {
//     steps,
//     stepIndex,
//     increasePos,
//     decreasePos,
//     simulateStockPriceChange,
//     sellEntirePos,
//     goBack,
//   } = useGamblingStore((state) => ({
//     steps: state.steps,
//     stepIndex: state.stepIndex,
//     increasePos: state.increasePos,
//     decreasePos: state.decreasePos,
//     simulateStockPriceChange: state.simulateStockPriceChange,
//     sellEntirePos: state.sellEntirePos,
//     goBack: state.goBack,
//   }));

//   const [amount, setAmount] = useState<number>(0);

//   const handleAction = (action: () => void) => {
//     action();
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <code className="font-mono font-bold">display actions</code>
//       <div className="flex space-x-4 mb-8">
//         <button
//           className={`${
//             stepIndex < 0
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-700"
//           } text-white font-bold py-2 px-4 rounded`}
//           onClick={() => handleAction(() => increasePos(stepIndex, amount))}
//           disabled={stepIndex === 0}
//         >
//           Increase Pos
//         </button>
//         <button
//           className={`${
//             stepIndex < 0
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-700"
//           } text-white font-bold py-2 px-4 rounded`}
//           onClick={() => handleAction(() => decreasePos(stepIndex, amount))}
//           disabled={stepIndex === 0}
//         >
//           Decrease Pos
//         </button>
//         <button
//           className={`${
//             stepIndex < 0
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-700"
//           } text-white font-bold py-2 px-4 rounded`}
//           onClick={() =>
//             handleAction(() => simulateStockPriceChange(stepIndex, amount))
//           }
//           disabled={stepIndex === 0}
//         >
//           Simulate Price Change
//         </button>
//         <button
//           className={`${
//             stepIndex < 0
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-700"
//           } text-white font-bold py-2 px-4 rounded`}
//           onClick={() =>
//             handleAction(() => sellEntirePos(stepIndex, "COMPLETED"))
//           }
//           disabled={stepIndex === 0}
//         >
//           Sell Entire Pos
//         </button>
//         <button
//           className={`${
//             stepIndex < 0
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-700"
//           } text-white font-bold py-2 px-4 rounded`}
//           onClick={() => handleAction(() => goBack())}
//           disabled={stepIndex === 0}
//         >
//           Go Back
//         </button>
//       </div>
//       <div>
//         <label>
//           Amount:
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(parseFloat(e.target.value))}
//             placeholder="Amount"
//             className="p-2 text-black"
//             required
//           />
//         </label>
//       </div>
//       <h1>Current State:</h1>
//       <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
//     </main>
//   );
// }
//__________________________________________________________________________________

// import { useGamblingStore } from "@/src/lib/store";

// export default function DisplayActions() {
//   const {
//     steps,
//     stepIndex,
//     increasePos,
//     decreasePos,
//     simulateStockPriceChange,
//     sellEntirePos,
//     goBack,
//   } = useGamblingStore((state) => ({
//     steps: state.steps,
//     stepIndex: state.stepIndex,
//     increasePos: state.increasePos,
//     decreasePos: state.decreasePos,
//     simulateStockPriceChange: state.simulateStockPriceChange,
//     sellEntirePos: state.sellEntirePos,
//     goBack: state.goBack,
//   }));

//   const handleIncreasePos = () => {
//     increasePos(1, 2);
//   };

//   const handleDecreasePos = () => {
//     decreasePos(1, 2);
//   };

//   const handleSimulateStockPriceChange = () => {
//     simulateStockPriceChange(1, 2);
//   };

//   const handleSellEntirePos = () => {
//     sellEntirePos(1, "COMPLETED");
//   };

//   const handleGoBack = () => {
//     goBack(1);
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <code className="font-mono font-bold">display screen</code>
//       <button
//         className={`${
//           stepIndex > 0
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-700"
//         } text-white font-bold py-2 px-4 rounded`}
//         onClick={handleIncreasePos}
//         disabled={stepIndex > 0} // Disable button if stepIndex is greater than 0
//       ></button>
//       <h1>Current State:</h1>
//       <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
//     </main>
//   );
// }
