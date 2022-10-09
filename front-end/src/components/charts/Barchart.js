import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({columnColors, columnNames, columnValues, title}){
  const labels = columnNames;

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: columnValues,
        backgroundColor: columnColors,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: title
      },
    },
    maintainAspectRatio: false 
    
  };


  {
    return <Bar options={options} width={300} height={200} data={data} />;
  }
}