"use client";
import DisplayScreen from "./components/DisplayScreen";

import { Suspense } from "react";
import StockChartClient from "./components/StockChartClient";

const Home: React.FC = () => {
  const scrollToGetStarted = () => {
    const stockChartSection = document.getElementById("stock-chart");

    if (stockChartSection) {
      stockChartSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
        <h1 className="text-4xl font-bold pb-4">Welcome to T-STONK PLAYS</h1>
        <p className="text-lg text-gray-600">
          Create investment strategies, view the latest stocks, and more.
        </p>
        <button
          onClick={scrollToGetStarted}
          className="pt-8 text-blue-500 hover:underline cursor-pointer"
        >
          Get started
        </button>
      </div>

      {/* Scroll-to section */}
      <div className="w-full h-20 relative bg-gray-900" id="stock-chart">
        <div className="pt-2 ring-2 bg-gray-950 animate-pulse"></div>
      </div>

      <div className="w-full pb-20 bg-gray-900">
        <Suspense fallback={<StockChartFallback />}>
          <StockChartClient />
        </Suspense>
      </div>
      <div>
        <DisplayScreen />
      </div>
    </>
  );
};

const StockChartFallback: React.FC = () => {
  return <div className="w-auto text-white">Loading...</div>;
  // <Image
  //   src={chartLoadingSkeleton}
  //   alt="Chart Loading Skeleton"
  //   width={600}
  //   height={600}
  // />
};

export default Home;
