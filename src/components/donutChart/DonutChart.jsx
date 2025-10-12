import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const DonutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const isDark = useSelector((state) => state.theme.value);
  const salesData = [
    { label: "Direct", value: 20, amount: "$300.56", color: "#1C1C1C" },
    { label: "Affiliate", value: 38.6, amount: "$135.18", color: "#88E8C0" },
    { label: "Sponsored", value: 20, amount: "$154.02", color: "#8B7FFF" },
    { label: "E-mail", value: 21.4, amount: "$48.96", color: "#A8D5E5" },
  ];

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const data = {
        datasets: [
          {
            data: salesData.map((item) => item.value),
            backgroundColor: salesData.map((item) => item.color),
            borderColor: salesData.map((item) => item.color),
            borderWidth: 0,
          },
        ],
      };

      const roundedSeparator = {
        id: "roundedSeparator",
        afterDatasetDraw(chart) {
          const { ctx } = chart;

          chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
            ctx.save();
            const { x, y, outerRadius, innerRadius, startAngle, endAngle } =
              dataPoint;
            const capRadius = (outerRadius - innerRadius) / 2;
            const segmentColor = data.datasets[0].backgroundColor[index];
            const segmentColor1 = data.datasets[0].backgroundColor[0];
            const angleOffset = 0.03;

            const startX =
              x +
              Math.cos(startAngle + angleOffset) * (outerRadius - capRadius);
            const startY =
              y +
              Math.sin(startAngle + angleOffset) * (outerRadius - capRadius);

            ctx.beginPath();
            ctx.fillStyle = segmentColor;
            ctx.arc(startX, startY, capRadius, 0, Math.PI * 2);
            ctx.fill();

            const endX =
              x +
              Math.cos(endAngle - angleOffset) * (outerRadius - capRadius);
            const endY =
              y +
              Math.sin(endAngle - angleOffset) * (outerRadius - capRadius);

            ctx.beginPath();
            ctx.fillStyle = isDark ? "#282828" : "white";
            ctx.arc(endX, endY, capRadius + 1, 0, Math.PI * 2);
            ctx.fill();

            if (index === chart.getDatasetMeta(0).data.length - 1) {
              const endCenterX =
                x +
                Math.cos(endAngle + 0.04) * (outerRadius - capRadius);
              const endCenterY =
                y +
                Math.sin(endAngle + 0.04) * (outerRadius - capRadius);

              ctx.beginPath();
              ctx.fillStyle = segmentColor1;
              ctx.arc(endCenterX, endCenterY, capRadius, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          });
        },
      };

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: "75%",
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              displayColors: false,
              cornerRadius: 10,
              padding: 10,
              caretSize: 0,
              backgroundColor: isDark ? "#3a3a3a" : "#1c1c1c",
              bodyFont: {
                size: 16,
                weight: "bold",
              },
              callbacks: {
                label: function (context) {
                  return context.parsed + "%";
                },
              },
            },
          },
        },
        plugins: [roundedSeparator],
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [isDark]);

  return (
    <div
      className={`w-full h-full ${
        isDark ? "bg-[#282828]" : "bg-[#F7F9FB]"
      } rounded-2xl p-6 flex flex-col`}
    >
      {/* Title */}
      <h2
        className={`text-xl font-bold mb-4 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Total Sales
      </h2>

      {/* Chart Container */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 h-fit ">
        {salesData.map((item, index) => (
          <div key={index} className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span
                className={`text-sm ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {item.label}
              </span>
            </div>
            <span
              className={`text-sm font-medium ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;