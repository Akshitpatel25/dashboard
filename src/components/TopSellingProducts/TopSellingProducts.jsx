import React from "react";
import { useSelector } from "react-redux";

function TopSellingProducts() {
    const isDark = useSelector((state) => state.theme.value);
  const products = [
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
    {
      name: "Marco Shoes",
      price: "$79.49",
      quantity: 64,
      amount: "$1,965.81",
    },
  ];

  return (
    <div
      className={`w-full h-full ${
        isDark ? "bg-[#282828]" : "bg-[#F7F9FB]"
      } rounded-2xl p-6`}
    >
      {/* Title */}
      <h2
        className={`text-xl font-bold mb-6 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Top Selling Products
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr
              className={`border-b ${
                isDark ? "border-[#3a3a3a]" : "border-gray-200"
              }`}
            >
              <th
                className={`text-left pb-4 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Name
              </th>
              <th
                className={`text-left pb-4 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Price
              </th>
              <th
                className={`text-left pb-4 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Quantity
              </th>
              <th
                className={`text-left pb-4 text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Amount
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={`border-b ${
                  isDark ? "border-[#3a3a3a]" : "border-gray-200"
                } last:border-b-0`}
              >
                <td
                  className={`py-4 text-sm ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {product.name}
                </td>
                <td
                  className={`py-4 text-sm ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {product.price}
                </td>
                <td
                  className={`py-4 text-sm ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {product.quantity}
                </td>
                <td
                  className={`py-4 text-sm ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopSellingProducts;