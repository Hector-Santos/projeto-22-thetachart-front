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



export function BarChart({columnColors, columnNames, columnValues, title, width, height, fontSize}){
  const labels = columnNames;

  ChartJS.defaults.font.size = fontSize;
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
    maintainAspectRatio: false,
    options: {
      plugins:{
        legend: { 
          labels: { 
            fontSize: window.innerWidth > 350 ? 20 : 10 
          }
        }, 
      }
    } 
  };
 
 
  {
    return <Bar options={options} fontSize = {20} width={width} height={height} data={data} />;
  }
}