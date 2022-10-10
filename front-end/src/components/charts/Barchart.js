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

export function BarChart({columnColors, columnNames, columnValues, title, width, height}){
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
        labels:{
          fontSize: 20
        }
      },
      title: {
        display: true,
        text: title
      },
      scales:{
        yAxes: [{
          ticks: {
            fontSize: 40
          }
        }]
      }
    },
    maintainAspectRatio: false,
    options: {
      legend: {
        labels: {
          fontSize: window.innerWidth > 350 ? 20 : 10
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            reverse: false
          }
        }]
      }
    }
  };


  {
    return <Bar options={options} fontSize = {20} width={width} height={height} data={data} />;
  }
}