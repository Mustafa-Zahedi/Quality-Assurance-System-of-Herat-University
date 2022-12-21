// components/BarChart.js
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(...registerables);
export const PieChart = ({ chartData, label, x_label }) => {
  // console.log("barChart", chartData);
  return (
    <div
      dir="rtl"
      className="m-5 border-2 p-2 rounded-2xl border-red-200 shadow-lg font-vazirBold"
    >
      <h6 className="text-gray-700">{label}</h6>
      <Pie
        plugins={[ChartDataLabels]}
        options={{
          layout: { padding: 15 },
          plugins: {
            datalabels: {
              formatter: (val) => {
                return (+val).toFixed(0);
              },
            },
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
              hoverOffset: 20,
            },
          ],
        }}
      />
    </div>
  );
};
