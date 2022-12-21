// components/BarChart.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";
ChartJS.register(...registerables);

export const BarChart = ({ chartData, label, title, y_label, x_label }) => {
  // console.log("barChart", chartData);
  return (
    <div
      dir="rtl"
      className="my-10 border-2 p-5 rounded border-red-200 shadow-lg font-vazirBold"
    >
      <h6 className="text-gray-700">{label}</h6>
      <Bar
        options={{
          scales: {
            y: {
              title: { display: true, text: y_label },
              max: 100,
            },
            x: {
              title: { font: "vazir;", display: true, text: x_label },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: function (context) {
                  return `${x_label + " " + context[0].label}`;
                },
              },
              titleFont: { size: "14px" },
            },
          },
        }}
        data={{
          labels: [...chartData?.map((item) => item.label)],
          datasets: [
            {
              type: "line",
              label,
              data: [...chartData?.map((item) => item.percent)],
              borderColor: ["#6366f1"],
              tension: 0.4,
            },
            {
              axis: "y",
              label: label,
              data: [...chartData?.map((item) => item.percent)],
              fill: true,
              backgroundColor: [
                "#f87171",
                "#facc15",
                "#65a30d",
                "#2563eb",
                "#fb923c",
                "#e11d48",
                "#db2777",
              ],
              minBarLength: 1,
              barThickness: 50,
              maxBarThickness: 50,
            },
          ],
        }}
      />
    </div>
  );
};
