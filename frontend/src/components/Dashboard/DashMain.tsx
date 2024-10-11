"use client";
import { Statistics } from "@/utils/data";
import ProsumerScoreCard from "./ProsumerScoreCard";
import StatisticCard from "./StatisticCard";
import EnergyMetrics from "./Energy-metrics";
import MainDashHeader from "./MainDashHeader";
import { MarketplaceActivity } from "../MarketplaceActivity";
import { Assets } from "../Assets";
import { TotalEnergyChart } from "../TotalEnergyChart";
const DashMain = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainDashHeader />
      <div className="flex gap-4 p-4 md:p-5 pt-2">
        <ProsumerScoreCard className="mt-44" />
        <TotalEnergyChart />
      </div>
      <div className="p-4">
        <EnergyMetrics />
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-3 p-4">
        {Statistics.map((data, index) => (
          <StatisticCard
            key={index}
            icon={data.icon}
            title={data.title}
            value={data.value}
            unit={data.unit}
            extra={data.extra}
            bgColor={data.bgColor}
            textColor={data.textColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-3">
        <MarketplaceActivity />
        <Assets />
      </div>
    </div>
  );
};

export default DashMain;
