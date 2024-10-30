"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { metrics } from "@/utils/data";
import MetricCard from "./MetricCard";

interface IData {
  energyGenerated: number;
  energyInUse: number;
  energyInSurplus: number;
  energySold: number;
  energyBalance: number;
  energyBought: number;
}

export default function EnergyMetrics({ data }:{data: IData}) {
  const totalEnergyProduced = 54758.08;

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-[500] text-[#575757]">
          24h Energy metrics
        </CardTitle>
        <div className="mt-6 text-base font-[600] text-muted-foreground">
          {totalEnergyProduced.toLocaleString()}{" "}
          <span className="font-[400] text-sm">kWh total energy produced</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} data={data} />
          ))} */}
          <MetricCard 
            // key={index} 
            title={"Energy in use (locally)"}
            value={data?.energyInUse || 0} 
            percentage={(data?.energyInUse || 0) /100}
            color="text-[#47682C]"
            bg="text-[#47682C30]" />

          <MetricCard 
            // key={index} 
            title="Energy in surplus"
            value={data?.energyInSurplus || 0} 
            percentage={(data?.energyInSurplus || 0) /100}
            color="text-[#CD5334]"
            bg="text-[#CD533430]" />

          <MetricCard 
            // key={index} 
            title="Energy sold"
            value={data?.energySold || 0} 
            percentage={(data?.energySold || 0 ) / 100}
            color="text-[#0460FF]"
            bg="text-[#0460FF30]" />

          <MetricCard 
            // key={index} 
            title="Energy bought" 
            value={data?.energyBought || 0}
            percentage={(data?.energyBought || 0) /100}
            color="text-[#FF043230]"
            bg="text-[#FF043230]" />
        </div>
      </CardContent>
    </Card>
  );
}
