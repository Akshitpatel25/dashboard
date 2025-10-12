import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler
);

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartVersion, setChartVersion] = useState("");
  const isDark = useSelector((state) => state.theme.value);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const down = (ctx, value) => (ctx.p0.parsed.x > 2 ? value : undefined);

      const data = {
        labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
        datasets: [
          {
            label: "Current Week",
            data: [16, 10, 11, 15, 21, 20.5],
            tension: 0.4,
            borderWidth: 3,
            fill: false,
            pointRadius: 0,
            borderColor: isDark ? "#C6C7F8" : "#1c1c1c",
            segment: {
              borderColor: (ctx) =>
                down(ctx, isDark ? "#C6C7F8" : "#1c1c1c") ||
                (isDark ? "#C6C7F8" : "#1c1c1c"),
              borderDash: (ctx) => down(ctx, [6, 6]),
            },
            pointBackgroundColor: "white",
            pointBorderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Previous Week",
            data: [10, 19, 16, 12, 14, 24],
            tension: 0.3,
            borderWidth: 3,
            fill: false,
            pointRadius: 0,
            borderColor: "#A8C5DA",
            pointBackgroundColor: "white",
            pointBorderColor: "rgba(0, 0, 0, 1)",
          },
        ],
      };

      const config = {
        type: "line",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              // left: 40,
              right: 40,
            },
            
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                padding: 10,
                min: 0,
                font: {
                  size: 14,
                },
              },
            },
            y: {
              grace: "5",
              beginAtZero: true,
              max: 30, // Add this
              grid: {
                display: true,
                color: isDark ? "#333" : "#e5e5e5", // Optional: better colors
              },
              ticks: {
                display: true,
                padding: 20,
                font: {
                  size: 14,
                },
                callback: (value) => (value == 0 ? "0" : value + "M"),
                stepSize: 10, // Change from 4 to 10
                count: 4, // Add this to force 4 ticks (0, 10, 20, 30)
              },
              border: {
                display: false,
              },
            },
          },
        },
      };

      chartInstance.current = new Chart(ctx, config);
      setChartVersion(Chart.version);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isDark]);

  return (
    <div
      className={`${
        isDark ? "bg-[#282828]" : "bg-[#f7f9fb]"
      } rounded-2xl h-full w-full flex flex-col`}
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-theme-text">Revenue</h1>
          <span className={`w-0.5 h-6 ${isDark ? "bg-[#FFFFFF33]" : "bg-[#1C1C1C33]"}`}></span>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isDark ? "bg-[#C6C7F8]" : "bg-[#1c1c1c]"
              }`}
            ></span>
            <span className="text-sm font-medium text-theme-text">
              Current Week <span className="ml-1">$58,211</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8C5DA]"></span>
            <span className="text-sm font-medium text-theme-text">
              Previous Week <span className="ml-1">$68,768</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 pb-6">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default LineChart;
