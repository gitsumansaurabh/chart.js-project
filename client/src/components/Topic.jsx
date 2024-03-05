import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "./dataSlice";
import React, { useEffect } from "react";
import { Bar, Doughnut, Scatter, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function Topic() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const topic = [
    "gas",
    "oil",
    "consumption",
    "market",
    "gdp",
    "war",
    "production",
    "export",
    "battery",
    "biofuel",
    "policy",
    "economy",
    "strategy",
    "robot",
    "growth",
    "economic",
    "energy",
    "food",
    "administration",
    "unemployment",
    "trade",
    "demand",
    "economic growth",
    "industry",
    "capital",
    "worker",
    "tension",
    "terrorism",
    "transport",
    "peak oil",
    "vehicle",
    "tourist",
    "artificial intelligence",
    "climate",
    "power",
    "crisis",
    "ice",
    "population",
    "politics",
    "business",
    "work",
    "coal",
    "gamification",
    "finance",
    "interest rate",
    "risk",
    "inflation",
    "asylum",
    "resource",
    "plastic",
    "electricity",
    "bank",
    "gasoline",
    "car",
    "money",
    "technology",
    "aquaculture",
    "city",
    "investment",
    "revenue",
    "emission",
    "climate change",
    "infrastructure",
    "government",
    "security",
    "software",
    "building",
    "transportation",
    "wealth",
    "clothing",
    "shortage",
    "debt",
    "agriculture",
    "tax",
    "carbon",
    "brexit",
    "workforce",
    "change",
    "automaker",
    "nuclear",
    "3D",
    "water",
    "data",
    "fossil fuel",
    "election",
    "greenhouse gas",
    "information",
    "shale gas",
    "factory",
    "farm",
    "communication",
    "storm",
    "consumer",
    "material",
    "Washington",
    "pollution",
    "fracking",
  ];

  const freq = topic.map((x) => {
    let temp = 0;
    data.forEach((d) => {
      if (d.topic === x) {
        temp++;
      }
    });
    return temp;
  });

  return (
    <div className="w-full h-80 px-4 py-4 my-2 grid place-items-center bg-white border border-solid border-gray-300 rounded-md">
      <Line
        data={{
          labels: topic,
          datasets: [
            {
              label: "Topic Frequency",
              data: freq,
              backgroundColor: ["rgba(255, 0, 0, 0.8)"],
              borderRadius: 5,
              borderColor: "#ff704d",
            },
          ],
        }}
        options={{
          // animations: {
          //   tension: {
          //     duration: 1000,
          //     easing: "linear",
          //     from: 1,
          //     to: 0,
          //     loop: true,
          //   },
          // },
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              text: "Topic",
            },
          },
        }}
      />
    </div>
  );
}
