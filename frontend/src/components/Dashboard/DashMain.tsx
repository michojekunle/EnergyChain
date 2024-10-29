"use client";
import { Statistics } from "@/utils/data";
import ProsumerScoreCard from "./ProsumerScoreCard";
import StatisticCard from "./StatisticCard";
import EnergyMetrics from "./Energy-metrics";
import MainDashHeader from "./MainDashHeader";
import { MarketplaceActivity } from "../MarketplaceActivity";
import { Assets } from "../Assets";
import { TotalEnergyChart } from "../TotalEnergyChart";
import MemoBulb from "@/icons/Bulb";
import axios from "axios";
import { useEffect, useState } from "react";

interface IData {
  energyGenerated: number;
  energyInUse: number;
  energyInSurplus: number;
  energySold: number;
  energyBalance: number;
  energyBought: number;
}

const DashMain = () => {

  const [, setIsLoading] = useState(false);
  const [sellData, setSellData] = useState<IData>();
  // const [buyData, setBuyData] = useState([]);

  // {
  //   "_id": "67072c4bf4b390b2104acf71",
  //   "sellerId": 325231,
  //   "location": "Lagos Nigeria",
  //   "walletAddress": "0x1352b7819bew78jk",
  //   "meterNumber": "MTR456",
  //   "energyGenerated": 150,
  //   "energyInUse": 80,
  //   "energyInSurplus": 70,
  //   "energySold": 0,
  //   "energyBalance": 0,
  //   "energyBought": 0,
  //   "__v": 0
  // }

  const getSellData = async () => {
    setIsLoading(true);
    try {
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sellers/sellerById/67072c4bf4b390b2104acf71`)
      setSellData(response.data)

      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSellData()
  }, [sellData])

  // if(isLoading) {
  //   return (
  //     <div>Loading...</div>
  //   )
  // }

  return (
    <div className="flex flex-col min-h-screen">
      <MainDashHeader />
      <div className="flex gap-4 p-4 md:p-5 pt-2">
        <ProsumerScoreCard data={sellData as IData} className="mt-44" />
        <TotalEnergyChart />
      </div>
      <div className="p-4">
        <EnergyMetrics data={sellData as IData} />
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-3 p-4">
      {/* {
    icon: MemoBulb,
    title: "Energy generated",
    value: "54,6893",
    unit: "KWH",
    bgColor: "#E6F6E4",
  }, */}
        <StatisticCard
            // key={index}
            icon={MemoBulb}
            title={"Energy generated"}
            value={Number(sellData?.energyGenerated)}
            unit={"KWH"}
            // extra={data.extra}
            bgColor={"#E6F6E4"}
            textColor={"#21250F"}
          />
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
