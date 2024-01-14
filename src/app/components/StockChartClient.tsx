import StockChart from "./StockChart";
import dynamic from "next/dynamic";

export default dynamic(() => Promise.resolve(StockChart), { ssr: false });
