import React, { useEffect, useRef, useState } from "react";
import * as Chart from "chart.js";
import { useSelector } from "react-redux";

export default function StackedBarChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const isDark = useSelector((state) => state.theme.value);

  // Track container size
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      // Calculate responsive sizes based on container height
      const height = containerSize.height || 300;
      const fontSize = Math.max(10, Math.min(20, height / 15));
      const padding = Math.max(10, Math.min(30, height / 15));

      // Chart data
      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Projection",
            data: [18, 21, 19, 23, 15, 21],
            backgroundColor: "#a8c5d4",
            borderColor: "#a8c5d4",
            borderWidth: 0,
            barPercentage: 0.4,
          },
          {
            label: "Actual",
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
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              mode: "index",
              intersect: false,
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ": $" + context.parsed.y + "M";
                },
              },
            },
          },
          hover: {
            mode: null,
          },
          interaction: {
            mode: null,
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
                  size: fontSize,
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
                padding: padding,
                color: "#999",
                font: {
                  size: fontSize,
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
  }, [isDark, containerSize]);

  return (
    <div
      className={`${
        isDark ? "bg-[#282828]" : "bg-[#f7f9fb]"
      } rounded-2xl h-full w-full flex flex-col`}
    >
      <h1 className=" text-lg xl:text-xl font-bold px-5 xl:px-6 pt-3 xl:pt-6 pb-2">
        Projections vs Actuals
      </h1>
      <div ref={containerRef} className="flex-1 p-3 px-0 xl:px-6 xl:pb-6 min-h-0">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}