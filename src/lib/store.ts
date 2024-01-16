import { create } from "zustand";

export type Status = "IN_PROGRESS" | "COMPLETED";

export type PositionStep = {
  id: number;
  positionAmount: number;
  shares: number; // Added shares
  increasedBy: number;
  decreasedBy: number;
  stockPrice: number;
  status: Status;
  totalPutIn: number;
  totalLosses: number;
  totalGains: number;
  profit: number;
};

export type State = {
  steps: PositionStep[];
  stepIndex: number;
};

export type Actions = {
  startNewPos: (positionAmount: number, stockPrice: number) => void;
  increasePos: (id: number, increasedBy: number) => void;
  decreasePos: (id: number, decreasedBy: number) => void;
  simulateStockPriceChange: (id: number, stockPrice: number) => void;
  sellEntirePos: (id: number, status: Status) => void;
  goBack: () => void;
};

export const useGamblingStore = create<State & Actions>()((set) => ({
  steps: [],
  stepIndex: 0,
  startNewPos: (positionAmount: number, stockPrice: number) =>
    set((state) => ({
      steps: [
        ...state.steps,
        {
          id: state.stepIndex,
          positionAmount,
          shares: positionAmount / stockPrice, // Calculate shares
          increasedBy: 0,
          decreasedBy: 0,
          stockPrice,
          status: "IN_PROGRESS",
          totalPutIn: positionAmount,
          totalLosses: 0,
          totalGains: 0,
          profit: 0,
        },
      ],
      stepIndex: state.stepIndex + 1,
    })),
  increasePos: (id: number, increasedBy: number) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === id
          ? {
              ...step,
              id: state.stepIndex,
              positionAmount: step.positionAmount + increasedBy,
              shares: (step.positionAmount + increasedBy) / step.stockPrice,
              totalPutIn: step.totalPutIn + increasedBy,
            }
          : step
      ),
      stepIndex: state.stepIndex + 1,
    })),
  decreasePos: (id: number, decreasedBy: number) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === id
          ? {
              ...step,
              id: state.stepIndex,
              positionAmount: Math.max(step.positionAmount - decreasedBy, 0),
              shares: Math.max(
                (step.positionAmount - decreasedBy) / step.stockPrice,
                0
              ),
              totalPutIn: Math.max(step.totalPutIn - decreasedBy, 0),
            }
          : step
      ),
      stepIndex: state.stepIndex + 1,
    })),
  simulateStockPriceChange: (id: number, stockPrice: number) =>
    set((state) => ({
      steps: state.steps.map((step) => {
        const percentageChange =
          ((stockPrice - step.stockPrice) / step.stockPrice) * 100;
        const totalLosses =
          percentageChange < 0
            ? step.totalLosses - (step.positionAmount * percentageChange) / 100
            : step.totalLosses;
        const totalGains =
          percentageChange > 0
            ? step.totalGains + (step.positionAmount * percentageChange) / 100
            : step.totalGains;

        return step.id === id
          ? {
              ...step,
              id: state.stepIndex,
              positionAmount:
                step.positionAmount * (step.stockPrice / stockPrice),
              shares:
                (step.positionAmount * (step.stockPrice / stockPrice)) /
                stockPrice,
              stockPrice,
              totalLosses,
              totalGains,
            }
          : step;
      }),
      stepIndex: state.stepIndex + 1,
    })),
  sellEntirePos: (id: number) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === id
          ? {
              ...step,
              id: state.stepIndex,
              status: "COMPLETED",
              totalProfit: step.totalGains - step.totalLosses,
            }
          : step
      ),
      stepIndex: state.stepIndex + 1,
    })),
  goBack: () =>
    set((state) => ({
      steps: state.steps.slice(0, -1), // Remove the last step
      stepIndex: Math.max(state.stepIndex - 1, 0), // Ensure stepIndex doesn't go below 0
    })),
}));

// import { create } from "zustand";
// import { v4 as uuidv4 } from "uuid";

// export type Status = "IN_PROGRESS" | "COMPLETED";

// export type PositionStep = {
//   id: string; // Change id type to string
//   positionAmount: number;
//   shares: number;
//   increasedBy: number;
//   decreasedBy: number;
//   stockPrice: number;
//   status: Status;
//   totalPutIn: number;
//   totalLosses: number;
//   totalGains: number;
//   profit: number;
// };

// export type State = {
//   steps: PositionStep[];
//   stepIndex: number;
// };

// export type Actions = {
//   startNewPos: (positionAmount: number, stockPrice: number) => void;
//   increasePos: (id: string, increasedBy: number) => void; // Change id type to string
//   decreasePos: (id: string, decreasedBy: number) => void; // Change id type to string
//   simulateStockPriceChange: (id: string, stockPrice: number) => void; // Change id type to string
//   sellEntirePos: (id: string) => void; // Change id type to string
//   goBack: () => void;
// };

// // Function to create a new unique ID
// const createNewId = (): string => uuidv4();

// export const useGamblingStore = create<State & Actions>()((set) => ({
//   steps: [],
//   stepIndex: 0,
//   startNewPos: (positionAmount: number, stockPrice: number) =>
//     set((state) => ({
//       steps: [
//         ...state.steps,
//         {
//           id: createNewId(), // Use the new function to generate a unique id
//           positionAmount,
//           shares: positionAmount / stockPrice,
//           increasedBy: 0,
//           decreasedBy: 0,
//           stockPrice,
//           status: "IN_PROGRESS",
//           totalPutIn: positionAmount,
//           totalLosses: 0,
//           totalGains: 0,
//           profit: 0,
//         },
//       ],
//       stepIndex: state.stepIndex + 1,
//     })),
//   increasePos: (id: string, increasedBy: number) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === id
//           ? {
//               ...step,
//               id: createNewId(), // Use the new function to generate a unique id
//               positionAmount: step.positionAmount + increasedBy,
//               shares: (step.positionAmount + increasedBy) / step.stockPrice,
//               totalPutIn: step.totalPutIn + increasedBy,
//             }
//           : step
//       ),
//       stepIndex: state.stepIndex + 1,
//     })),
//   decreasePos: (id: string, decreasedBy: number) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === id
//           ? {
//               ...step,
//               id: createNewId(), // Use the new function to generate a unique id
//               positionAmount: Math.max(step.positionAmount - decreasedBy, 0),
//               shares: Math.max(
//                 (step.positionAmount - decreasedBy) / step.stockPrice,
//                 0
//               ),
//               totalPutIn: Math.max(step.totalPutIn - decreasedBy, 0),
//             }
//           : step
//       ),
//       stepIndex: state.stepIndex + 1,
//     })),
//   simulateStockPriceChange: (id: string, stockPrice: number) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === id
//           ? {
//               ...step,
//               id: createNewId(), // Use the new function to generate a unique id
//               positionAmount:
//                 step.positionAmount * (step.stockPrice / stockPrice),
//               shares:
//                 (step.positionAmount * (step.stockPrice / stockPrice)) /
//                 stockPrice,
//               stockPrice,
//               totalLosses:
//                 step.totalLosses -
//                 (step.positionAmount *
//                   (((stockPrice - step.stockPrice) / step.stockPrice) * 100)) /
//                   100,
//               totalGains:
//                 step.totalGains +
//                 (step.positionAmount *
//                   (((stockPrice - step.stockPrice) / step.stockPrice) * 100)) /
//                   100,
//             }
//           : step
//       ),
//       stepIndex: state.stepIndex + 1,
//     })),
//   sellEntirePos: (id: string) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === id
//           ? {
//               ...step,
//               id: createNewId(), // Use the new function to generate a unique id
//               status: "COMPLETED",
//               totalProfit: step.totalGains - step.totalLosses,
//             }
//           : step
//       ),
//       stepIndex: state.stepIndex + 1,
//     })),
//   goBack: () =>
//     set((state) => ({
//       steps: state.steps.slice(0, -1),
//       stepIndex: Math.max(state.stepIndex - 1, 0),
//     })),
// }));

//----------------------------------------------------------------------------------------------------------------

//________________________________________________________________________________________________________________

// import { create } from "zustand";

// export type Status = "IN_PROGRESS" | "COMPLETED";

// export type PositionStep = {
//   id: number;
//   positionAmount: number;
//   increasedBy: number;
//   decreasedBy: number;
//   stockPrice: number;
//   status: Status;
//   totalPutIn: number;
//   totalLosses: number;
//   totalGains: number;
//   profit: number;
// };

// export type State = {
//   steps: PositionStep[];
//   stepIndex: number;
// };

// export type Actions = {
//   startNewPos: (positionAmount: number, stockPrice: number) => void;
//   increasePos: (id: number, increasedBy: number) => void;
//   decreasePos: (id: number, decreasedBy: number) => void;
//   simulateStockPriceChange: (id: number, stockPrice: number) => void;
//   sellEntirePos: (id: number, status: Status) => void;
//   goBack: (id: number) => void;
// };

// export const useGamblingStore = create<State & Actions>()((set) => ({
//   steps: [],
//   stepIndex: 0,
//   startNewPos: (positionAmount: number, stockPrice: number) =>
//     set((state) => ({
//       steps: [
//         ...state.steps,
//         {
//           id: state.stepIndex,
//           positionAmount,
//           increasedBy: 0,
//           decreasedBy: 0,
//           stockPrice,
//           status: "IN_PROGRESS",
//           totalPutIn: positionAmount,
//           totalLosses: 0,
//           totalGains: 0,
//           profit: 0,
//         },
//       ],
//       stepIndex: state.stepIndex + 1,
//     })),
//   increasePos: (id: number, increasedBy: number) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === id
//           ? {
//               ...step,
//               positionAmount: step.positionAmount + increasedBy,
//               totalPutIn: step.totalPutIn + increasedBy,
//             }
//           : step
//       ),
//       stepIndex: state.stepIndex + 1,
//     })),
//   decreasePos: (id: number, decreasedBy: number) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === id
//           ? {
//               ...step,
//               positionAmount: Math.max(step.positionAmount - decreasedBy, 0),
//               totalPutIn: Math.max(step.totalPutIn - decreasedBy, 0),
//             }
//           : step
//       ),
//       stepIndex: state.stepIndex + 1,
//     })),
//   simulateStockPriceChange: (id: number, stockPrice: number) =>
//     set((state) => ({
//       steps: state.steps.map((step) => {
//         const percentageChange =
//           ((stockPrice - step.stockPrice) / step.stockPrice) * 100;
//         const totalLosses =
//           percentageChange < 0
//             ? step.totalLosses - (step.positionAmount * percentageChange) / 100
//             : step.totalLosses;
//         const totalGains =
//           percentageChange > 0
//             ? step.totalGains + (step.positionAmount * percentageChange) / 100
//             : step.totalGains;

//         return step.id === id
//           ? {
//               ...step,
//               positionAmount:
//                 step.positionAmount * (step.stockPrice / stockPrice),
//               stockPrice,
//               totalLosses,
//               totalGains,
//             }
//           : step;
//       }),
//       stepIndex: state.stepIndex + 1,
//     })),
//   sellEntirePos: (id: number) =>
//     set((state) => ({
//       steps: state.steps.map((step) =>
//         step.id === id
//           ? {
//               ...step,
//               status: "COMPLETED",
//               totalProfit: step.totalGains - step.totalLosses,
//             }
//           : step
//       ),
//       stepIndex: state.stepIndex + 1,
//     })),
//   goBack: (id: number) =>
//     set((state) => ({
//       steps: state.steps.filter((step) => step.id !== id),
//       stepIndex: state.stepIndex + 1,
//     })),
// }));
