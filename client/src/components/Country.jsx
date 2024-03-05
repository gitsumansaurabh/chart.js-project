import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "./dataSlice";
import React, { useEffect } from "react";
import { Bar, Doughnut, Radar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export default function Country() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const country = [
    "Mexico",
    "Nigeria",
    "Lebanon",
    "Russia",
    "Saudi Arabia",
    "Angola",
    "Egypt",
    "South Africa",
    "India",
    "Ukraine",
    "Azerbaijan",
    "China",
    "United States of America",
    "Colombia",
    "Niger",
    "Libya",
    "Brazil",
    "Mali",
    "Indonesia",
    "Iraq",
    "Iran",
    "South Sudan",
    "Venezuela",
    "Burkina Faso",
    "Germany",
    "United Kingdom",
    "Kuwait",
    "Canada",
    "Argentina",
    "Japan",
    "Austria",
    "Spain",
    "Estonia",
    "Hungary",
    "Australia",
    "Morocco",
    "Greece",
    "Qatar",
    "Oman",
    "Liberia",
    "Denmark",
    "Malaysia",
    "Jordan",
    "Syria",
    "Ethiopia",
    "Norway",
    "Ghana",
    "Kazakhstan",
    "Pakistan",
    "Gabon",
    "United Arab Emirates",
    "Algeria",
    "Turkey",
    "Cyprus",
    "Belize",
    "Poland",
  ];

  const freq = country.map((x) => {
    let temp = 0;
    data.forEach((d) => {
      if (d.country === x) {
        temp++;
      }
    });
    return temp;
  });

  return (
    <div className="w-full h-80 px-4 py-4 my-2 grid place-items-center bg-white border border-solid border-gray-300 rounded-md">
      <Line
        data={{
          labels: country,
          datasets: [
            {
              label: "Country Frequency",
              data: freq,
              backgroundColor: "#0000ff",
              borderRadius: 5,
              borderColor: "#6666ff",
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
              text: "Country",
            },
          },
        }}
      />
    </div>
  );
}
