import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "./dataSlice";
import React, { useEffect } from "react";
import { Bar, Line, Radar, Doughnut, PolarArea } from "react-chartjs-2";
import { Chart, defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function Relevance() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const value = [];
  for (let i = 1; i <= 6; i++) {
    value.push(i);
  }

  const freq = value.map((x) => {
    let temp = 0;
    data.forEach((d) => {
      if (d.relevance == x) {
        temp++;
      }
    });
    return temp;
  });

  return (
    <div className="w-full h-80 px-4 py-4 my-2 grid place-items-center bg-white border border-solid border-gray-300 rounded-md">
      <Doughnut
        data={{
          labels: value,
          datasets: [
            {
              label: "Relevance Frequency",
              data: freq,
              backgroundColor: [
                "#ccffff",
                "#ccff99",
                "#ffb3ff",
                "#9999ff",
                "#ff9999",
                "#ffff80",
              ],
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              text: "Relevance",
            },
          },
        }}
      />
    </div>
  );
}
