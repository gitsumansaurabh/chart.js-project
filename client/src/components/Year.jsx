import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "./dataSlice";
import React, { useEffect } from "react";
import { Bar, Bubble } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function Year() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const value = [];
  for (let i = 2010; i <= 2050; i++) {
    value.push(i);
  }

  const freq = value.map((x) => {
    let temp = 0;
    data.forEach((d) => {
      if (d.start_year === x) {
        temp++;
      }
    });
    return temp;
  });

  return (
    <div className="w-full h-80 px-4 py-4 my-2 grid place-items-center bg-white border border-solid border-gray-300 rounded-md">
      <Bar
        data={{
          labels: value,
          datasets: [
            {
              label: "Year Frequency",
              data: freq,
              backgroundColor: ["rgba(173, 51, 255, 0.8)"],
              borderRadius: 5,
              //   pointRadius: 5,
              //   pointHoverRadius: 8,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              text: "Start Year",
            },
          },
        }}
      />
    </div>
  );
}
