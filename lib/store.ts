import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Status = "IN_PROGRESS" | "COMPLETED";

export type PositionStep = {
  id: number;
  positionAmount: number;
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
  goBack: (id: number) => void;
};

export const useGamblingStore = create<State & Actions>()((set) => ({
  steps: [],
  stepIndex: 1,
  startNewPos: (positionAmount: number, stockPrice: number) =>
    set((state) => ({
      steps: [
        ...state.steps,
        {
          id: state.stepIndex,
          positionAmount,
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
              positionAmount: step.positionAmount + increasedBy,
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
              positionAmount: Math.max(step.positionAmount - decreasedBy, 0),
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
              positionAmount:
                step.positionAmount * (step.stockPrice / stockPrice),
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
              status: "COMPLETED",
              totalProfit: step.totalGains - step.totalLosses,
            }
          : step
      ),
      stepIndex: state.stepIndex + 1,
    })),
  goBack: (id: number) =>
    set((state) => ({
      steps: state.steps.filter((step) => step.id !== id),
      stepIndex: state.stepIndex + 1,
    })),
}));

// export const useGamblingStore = create<State & Actions>()(
//   persist(
//     set => ({
//       steps: [],
//       stepIndex: 1,
//         startNewPos: (positionAmount: number, stockPrice: number) =>
//         set(state => ({
//           steps: [
//             ...state.steps,
//             { id: state.stepIndex, positionAmount, increasedBy: 0, decreasedBy: 0, stockPrice, status: 'IN_PROGRESS', totalPutIn: positionAmount, totalLosses: 0, totalGains: 0, profit: 0 }
//           ],
//           stepIndex: state.stepIndex + 1,
//         })),
//         increasePos: (id: number, increasedBy: number) =>
//         set((state) => ({
//           steps: state.steps.map((step) =>
//             step.id === id ? { ...step, positionAmount: step.positionAmount + increasedBy, totalPutIn: step.totalPutIn + increasedBy, id: state.stepIndex } : step),
//             stepIndex: state.stepIndex + 1,
//         })),
//         decreasePos: (id: number, decreasedBy: number) =>
//         set((state) => ({
//             steps: state.steps.map((step) =>
//             step.id === id
//                 ? {
//                     ...step,
//                     positionAmount: Math.max(step.positionAmount - decreasedBy, 0),
//                     totalPutIn: Math.max(step.totalPutIn - decreasedBy, 0),
//                     id: state.stepIndex
//                 }
//                 : step
//             ),
//             stepIndex: state.stepIndex + 1,
//         })),
//         simulateStockPriceChange: (id: number, stockPrice: number) =>
//         set((state) => ({
//             steps: state.steps.map((step) => {
//             const percentageChange = (stockPrice - step.stockPrice) / step.stockPrice * 100
//             const totalLosses = percentageChange < 0 ? step.totalLosses - (step.positionAmount * percentageChange / 100) : step.totalLosses
//             const totalGains = percentageChange > 0 ? step.totalGains + (step.positionAmount * percentageChange / 100) : step.totalGains

//             return step.id === id
//                 ? {
//                     ...step,
//                     positionAmount: (step.positionAmount * (step.stockPrice / stockPrice)),
//                     stockPrice,
//                     totalLosses,
//                     totalGains,
//                     id: state.stepIndex
//                 }
//                 : step
//             }),
//             stepIndex: state.stepIndex + 1,
//         })),
//         sellEntirePos: (id: number, status: Status) =>
//         set((state) => ({
//           steps: state.steps.map((step) =>
//             step.id === id
//               ? {
//                   ...step,
//                   status,
//                   totalProfit: step.totalGains - step.totalLosses,
//                   id: state.stepIndex
//                 }
//               : step
//           ),
//             stepIndex: state.stepIndex + 1,
//         })),
//         goBack: (id: number) =>
//         set((state) => ({
//           steps: state.steps.filter((step) => step.id !== id),
//         })),
//     }),
//     { name: 'gambling-store', skipHydration: true }
//   )
// )
