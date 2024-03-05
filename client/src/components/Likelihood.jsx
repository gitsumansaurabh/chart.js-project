import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "./dataSlice";
import React, { useEffect } from "react";
import { Bar, Radar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function Likelihood() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const value = [];
  for (let i = 1; i <= 5; i++) {
    value.push(i);
  }

  const freq = value.map((x) => {
    let temp = 0;
    data.forEach((d) => {
      if (d.likelihood === x) {
        temp++;
      }
    });
    return temp;
  });

  return (
    <div className="w-full h-80 px-4 py-4 my-2 grid place-items-center bg-white border border-solid border-gray-300 rounded-md">
      <Radar
        data={{
          labels: value,
          datasets: [
            {
              label: "Likelihood Frequency",
              data: freq,
              backgroundColor: ["rgba(102, 179, 255, 0.8)"],
              borderRadius: 0,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              text: "Likelihood",
            },
          },
        }}
      />
    </div>
  );
}
