import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title
} from "chart.js";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { colors } from "../../utils/themeColors";

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
);

const datasetOptions = {
  fill: true,
  borderWidth: 1,
  backgroundColor: colors.primary.light,
  borderColor: colors.primary.main,
  pointRadius: 2,
  pointBorderWidth: 4,
};

const options: object = {
  legend: {
    display: false,
  },
  tooltips: {
    displayColors: false,
    callbacks: {
      title: () => "",
      filter: () => false,
      label: (tooltipItem) => {
        console.log(tooltipItem);

        var label = tooltipItem.label;

        if (label) {
          label += " - ";
        }

        return `${label}$${Math.round(tooltipItem.yLabel * 100) / 100}`;
      },
    },
  },
  scales: {
    grid: {
      display: false,
    },
    xAxes: [
      {
        display: false,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const AdminAnalyticsChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {

    let labelList = new Array(30).fill("").map((_item, ind) => {
      let date = new Date();
      date.setDate(ind + 1);
      return format(date, "dd MM");
    });

    setData({
      labels: labelList,
      datasets: [
        {
          // database citishop
          data: datasetData,
          ...datasetOptions,
        },
      ],
    });
  }, []);

  return <Chart type="line" data={data} options={options} />;
};

const datasetData = [
  10, 7, 4, 15, 12, 17, 13, 25, 22, 19,
  55, 62, 69, 43, 59, 60, 75, 62, 75, 80,
];

export default AdminAnalyticsChart;
