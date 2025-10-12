import React, { useEffect, useRef } from "react";
import * as Chart from "chart.js";
import { useSelector } from "react-redux";
import { Height } from "@mui/icons-material";

export default function StackedBarChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const isDark = useSelector((state) => state.theme.value);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Chart data
      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Category 1",
            data: [18, 21, 19, 23, 15, 21],
            backgroundColor: "#a8c5d4",
            borderColor: "#a8c5d4",
            borderWidth: 0,
            barPercentage: 0.4,
          },
          {
            label: "Category 2",
            data: [3, 5, 4, 6, 4, 5],
            backgroundColor: "rgba(168, 197, 212, 0.5)",
            borderColor: "#6b8694",
            borderWidth: 0,
            barPercentage: 0.4,
            borderRadius: 5,
          },
        ],
      };

      // Chart configuration
      const config = {
        type: "bar",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false, // disables tooltip
            },
          },
          hover: {
            mode: null, // disables hover interaction
          },
          interaction: {
            mode: null, // disables dataset hover interaction
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                color: "#999",
                font: {
                  size: 20,
                },
              },
            },
            y: {
              stacked: true,
              beginAtZero: true,
              max: 30,
              grid: {
                color: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
                drawBorder: false,
              },
              ticks: {
                padding: 30,
                color: "#999",
                font: {
                  size: 20,
                },
                callback: function (value) {
                  return value !== 0 ? value + "M" : value;
                },
                stepSize: 10,
              },
              border: {
                display: false,
              },
            },
          },
        },
      };

      // Create new chart instance
      chartInstance.current = new Chart.Chart(ctx, config);
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isDark]);


  return (
    <div className={` ${isDark ? "bg-[#282828]" : "bg-[#f7f9fb]"} rounded-2xl`}>
      <h1 className="text-xl font-bold p-6 ">Projections vs Actuals</h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
