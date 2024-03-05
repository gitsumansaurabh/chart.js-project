import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "./dataSlice";
import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function Region() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const region = [
    "Northern America",
    "Central America",
    "World",
    "Western Africa",
    "Western Asia",
    "Eastern Europe",
    "Central Africa",
    "Northern Africa",
    "Southern Africa",
    "Southern Asia",
    "Central Asia",
    "Eastern Asia",
    "South America",
    "South-Eastern Asia",
    "Eastern Africa",
    "Europe",
    "Western Europe",
    "Northern Europe",
    "Southern Europe",
    "Oceania",
    "Africa",
    "Asia",
    "world",
  ];

  const freq = region.map((x) => {
    let temp = 0;
    data.forEach((d) => {
      if (d.region === x) {
        temp++;
      }
    });
    return temp;
  });

  return (
    <div className="w-full h-80 px-4 py-4 my-2 grid place-items-center bg-white border border-solid border-gray-300 rounded-md">
      <Bar
        data={{
          labels: region,
          datasets: [
            {
              label: "Region Frequency",
              data: freq,
              backgroundColor: ["rgba(255, 153, 255, 0.8)"],
              borderRadius: 5,
              borderColor: ["rgba(230, 0, 230)"],
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              text: "Region",
            },
          },
        }}
      />
    </div>
  );
}
