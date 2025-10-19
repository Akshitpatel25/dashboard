import React from "react";
import { useSelector } from "react-redux";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import BarChartC from "../StackedBarChart/StackedBarChart";
import StackedBarChart from "../StackedBarChart/StackedBarChart";
import LineChart from "../lineChart/LineChart";
import WorldMap from "../worldMap/WorldMap";
import TopSellingProducts from "../TopSellingProducts/TopSellingProducts";
import DonutChart from "../donutChart/DonutChart";
// import { Navigate, useNavigate } from "react-router-dom";
const EcommerceDashboard = () => {
  const isDark = useSelector((state) => state.theme.value);

  // Stats data
  const stats = [
    {
      title: "Customers",
      value: "3,781",
      change: "+11.01%",
      isPositive: true,
      bgColor: isDark ? "#E3F5FF" : "#E3F5FF",
    },
    {
      title: "Orders",
      value: "1,219",
      change: "-0.03%",
      isPositive: false,
      bgColor: isDark ? "#FFFFFF0D" : "#F7F9FB",
    },
    {
      title: "Revenue",
      value: "$695",
      change: "+15.03%",
      isPositive: true,
      bgColor: isDark ? "#FFFFFF0D" : "#F7F9FB",
    },
    {
      title: "Growth",
      value: "30.1%",
      change: "+6.08%",
      isPositive: true,
      bgColor: isDark ? "#E5ECF6" : "#E5ECF6",
    },
  ];

  // Table data
  const topProducts = [
    {
      name: "ASOS Ridley High Waist",
      price: "$79.49",
      quantity: 82,
      amount: "$6,518.18",
    },
    {
      name: "Marco Lightweight Shirt",
      price: "$128.50",
      quantity: 37,
      amount: "$4,754.50",
    },
    {
      name: "Half Sleeve Shirt",
      price: "$39.99",
      quantity: 64,
      amount: "$2,559.36",
    },
    {
      name: "Lightweight Jacket",
      price: "$20.00",
      quantity: 184,
      amount: "$3,680.00",
    },
    { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
  ];

  // Sales data
  const salesData = [
    {
      label: "Direct",
      value: "$300.56",
      color: "#8B5CF6",
      percentage: "38.6%",
    },
    { label: "Affiliate", value: "$135.18", color: "#10B981", percentage: "" },
    { label: "Sponsored", value: "$154.02", color: "#3B82F6", percentage: "" },
    { label: "E-mail", value: "$48.96", color: "#F59E0B", percentage: "" },
  ];

  // const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold pb-5">eCommerce</h1>
      {/* Top Stats Cards */}
      <div className="flex flex-col xl:flex-row w-full h-fit gap-6  ">
        {/* 4boxs  */}
        <div className="w-full xl:w-1/2 grid grid-cols-2  gap-3 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl p-3 px-5 lg:p-6 transition-all hover:shadow-lg flex flex-col justify-around gap-2 w-full "
              style={{ backgroundColor: stat.bgColor }}
              {/* onClick={() => {
                if (stat.title === "Orders") {
                  navigate("/orderlist");
                }
              }} */}
            >
              <h1
                className={`font-semibold text-lg lg:text-2xl mb-1  ${
                  stat.title === "Orders" || stat.title === "Revenue"
                    ? isDark
                      ? "text-white"
                      : "text-[#1C1C1C]"
                    : isDark
                    ? "text-[#1c1c1c]"
                    : "text-[#1C1C1C]"
                }`}
              >
                {stat.title}
              </h1>

              <div className="flex items-start justify-between  flex-col md:flex-row">
                <h3
                  className={`text-lg lg:text-2xl font-semibold font-sans ${
                    stat.title === "Customers" || stat.title === "Growth"
                      ? "text-[#1C1C1C]"
                      : isDark
                      ? "text-white"
                      : "text-[#1C1C1C]"
                  }`}
                >
                  {stat.value}
                </h3>
                <div
                  className={`flex items-center gap-1 text-sm font-medium h-full ${
                    !isDark
                      ? "text-[#1C1C1C]"
                      : stat.title === "Revenue" || stat.title === "Orders"
                      ? "text-white"
                      : stat.isPositive
                      ? "text-black"
                      : "text-red-500"
                  }`}
                >
                  <span >{stat.change}</span>
                  {stat.isPositive ? (
                    <TrendingUp sx={{ fontSize: 16 }} />
                  ) : (
                    <TrendingDown
                      sx={{ fontSize: 16 }}
                      className="scale-x-[-1]"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full xl:w-1/2 h-80  ">
          <StackedBarChart />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row w-full h-fit gap-6 ">
        <div className="w-full xl:w-3/4 h-96 ">
          <LineChart />
        </div>

        <div className="w-full xl:w-1/4 h-96">
            <WorldMap />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row w-full gap-6 ">
      <div className="w-full xl:w-3/4 h-fit">
          <TopSellingProducts />
        </div>

      <div className="w-full xl:w-1/4 h-fit ">
          <DonutChart />
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
