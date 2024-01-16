"use client";
// import React, { Suspense } from "react";
// import Image from "next/image";
// import chartLoadingSkeleton from "../../public/chart_loading_skeleton.png";

import DisplayScreen from "./components/DisplayScreen";
import DisplayActions from "./components/DisplayActions";
// const StockChartClient = React.lazy(
//   () => import("./components/StockChartClient")
// );

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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to T-STONK PLAYS</h1>
        <p className="text-lg text-gray-600">
          Create investment strategies, view the latest stocks, and more.
        </p>
        <button
          onClick={scrollToGetStarted}
          className="mt-8 text-blue-500 hover:underline cursor-pointer"
        >
          Get started
        </button>
      </div>

      {/* Scroll-to section */}
      <div className="w-full h-20 relative" id="stock-chart">
        <div className="mt-4 ring-2 bg-white animate-pulse"></div>
      </div>

      <div className="w-full mb-20">
        {/* <Suspense fallback={<StockChartFallback />}>
          <StockChartClient />
        </Suspense> */}
      </div>
      <div>
        <DisplayScreen />
      </div>
      <div>
        <DisplayActions />
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
