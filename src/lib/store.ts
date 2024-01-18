import { create } from "zustand";

export type Status = "IN_PROGRESS" | "COMPLETED";

export type PositionStep = {
  id: number;
  positionAmount: number;
  shares: number;
  increasedBy: number;
  decreasedBy: number;
  stockPrice: number;
  status: Status;
  totalPutIn: number;
  totalLosses: number;
  totalGains: number;
  profitSold: number;
  totalProfit: number;
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
  sellEntirePos: (id: number) => void;
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
          shares: positionAmount / stockPrice,
          increasedBy: 0,
          decreasedBy: 0,
          stockPrice,
          status: "IN_PROGRESS",
          totalPutIn: positionAmount,
          totalLosses: 0,
          totalGains: 0,
          profitSold: 0,
          totalProfit: 0,
        },
      ],
      stepIndex: state.stepIndex + 1,
    })),
  increasePos: (id: number, increasedBy: number) =>
    set((state) => {
      const previousStep = state.steps.find((step) => step.id === id);

      if (!previousStep) {
        return state;
      }

      const newStep: PositionStep = {
        id: state.stepIndex,
        positionAmount: previousStep.positionAmount + increasedBy,
        shares:
          (previousStep.positionAmount + increasedBy) / previousStep.stockPrice,
        increasedBy,
        decreasedBy: 0,
        stockPrice: previousStep.stockPrice,
        status: "IN_PROGRESS",
        totalPutIn: previousStep.totalPutIn + increasedBy,
        totalLosses: previousStep.totalLosses,
        totalGains: previousStep.totalGains,
        profitSold: previousStep.profitSold,
        totalProfit: previousStep.totalProfit,
      };

      return {
        steps: [...state.steps, newStep],
        stepIndex: state.stepIndex + 1,
      };
    }),
  decreasePos: (id: number, decreasedBy: number) =>
    set((state) => {
      const previousStep = state.steps.find((step) => step.id === id);

      if (!previousStep || decreasedBy > previousStep.positionAmount) {
        return state;
      }

      const newTotalPutIn = Math.max(previousStep.totalPutIn - decreasedBy, 0);
      const excessDecrease = Math.max(decreasedBy - previousStep.totalPutIn, 0);

      const newStep: PositionStep = {
        id: state.stepIndex,
        positionAmount: Math.max(previousStep.positionAmount - decreasedBy, 0),
        shares: Math.max(
          (previousStep.positionAmount - decreasedBy) / previousStep.stockPrice,
          0
        ),
        increasedBy: 0,
        decreasedBy,
        stockPrice: previousStep.stockPrice,
        status: "IN_PROGRESS",
        totalPutIn: newTotalPutIn,
        totalLosses: previousStep.totalLosses,
        totalGains: previousStep.totalGains,
        profitSold: previousStep.profitSold + excessDecrease,
        totalProfit: previousStep.totalProfit,
      };

      return {
        steps: [...state.steps, newStep],
        stepIndex: state.stepIndex + 1,
      };
    }),
  simulateStockPriceChange: (id: number, stockPrice: number) =>
    set((state) => {
      const previousStep = state.steps.find((step) => step.id === id);

      if (!previousStep) {
        return state;
      }

      const percentageChange =
        ((stockPrice - previousStep.stockPrice) / previousStep.stockPrice) *
        100;
      const newPositionAmount =
        previousStep.positionAmount * (1 + percentageChange / 100);

      const newStep: PositionStep = {
        id: state.stepIndex,
        positionAmount: newPositionAmount,
        shares: newPositionAmount / stockPrice,
        increasedBy: 0,
        decreasedBy: 0,
        stockPrice,
        status: "IN_PROGRESS",
        totalPutIn: previousStep.totalPutIn,
        totalLosses:
          percentageChange < 0
            ? previousStep.totalLosses -
              (previousStep.positionAmount * percentageChange) / 100
            : previousStep.totalLosses,
        totalGains:
          percentageChange > 0
            ? previousStep.totalGains +
              (previousStep.positionAmount * percentageChange) / 100
            : previousStep.totalGains,
        profitSold: previousStep.profitSold,
        totalProfit: newPositionAmount - previousStep.totalPutIn,
      };

      return {
        steps: [...state.steps, newStep],
        stepIndex: state.stepIndex + 1,
      };
    }),
  sellEntirePos: (id: number) =>
    set((state) => {
      const previousStep = state.steps.find((step) => step.id === id);

      if (!previousStep) {
        return state;
      }

      const newTotalPutIn = Math.max(
        previousStep.totalPutIn - previousStep.positionAmount,
        0
      );
      const excessDecrease = Math.max(
        previousStep.positionAmount - previousStep.totalPutIn,
        0
      );

      const newStep: PositionStep = {
        id: state.stepIndex,
        positionAmount: 0,
        shares: 0,
        increasedBy: 0,
        decreasedBy: previousStep.positionAmount,
        stockPrice: previousStep.stockPrice,
        status: "COMPLETED",
        totalPutIn: newTotalPutIn,
        totalLosses: previousStep.totalLosses,
        totalGains: previousStep.totalGains,
        profitSold: previousStep.profitSold + excessDecrease,
        totalProfit: previousStep.positionAmount - previousStep.totalPutIn,
      };

      return {
        steps: [...state.steps, newStep],
        stepIndex: state.stepIndex + 1,
      };
    }),

  goBack: () =>
    set((state) => ({
      steps: state.steps.slice(0, -1),
      stepIndex: Math.max(state.stepIndex - 1, 0),
    })),
}));
