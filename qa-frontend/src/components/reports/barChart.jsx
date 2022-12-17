// components/BarChart.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";
ChartJS.register(...registerables);

export const BarChart = ({ chartData, label, title, y_label, x_label }) => {
  // console.log("barChart", chartData);
  return (
    <div className="my-10 border-2 p-5 rounded border-red-200 shadow-lg">
      <h6 className="text-gray-700">{label}</h6>
      <Bar
        options={{
          scales: {
            y: {
              title: { display: true, text: y_label },
              max: 100,
            },
            x: {
              title: { display: true, text: x_label },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: function (context) {
                  return `${x_label + " " + context[0].label}`;
                },
              },
              titleFont: { size: "20px" },
            },
          },
        }}
        data={{
          labels: [...chartData?.map((item) => item.label)],
          datasets: [
            {
              axis: "y",
              label: label,
              data: [...chartData?.map((item) => item.percent)],
              fill: true,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};
