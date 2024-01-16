import { useGamblingStore } from "@/src/lib/store";

export default function DisplayScreen() {
  const { steps, stepIndex, startNewPos } = useGamblingStore((state) => ({
    steps: state.steps,
    stepIndex: state.stepIndex,
    startNewPos: state.startNewPos,
  }));

  const handleStartNewPos = () => {
    startNewPos(1000, 200);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <code className="font-mono font-bold">display screen</code>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleStartNewPos}
        disabled={stepIndex > 1} // Disable button if stepIndex is greater than 1
      >
        Start new position
      </button>
      <h1>Current State:</h1>
      <pre>{JSON.stringify({ steps, stepIndex }, null, 2)}</pre>
    </main>
  );
}
