import Card from "react-bootstrap/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ResultGraph({ rows }) {
  // X-axis: year 1, 2, 3,...
  const labels = rows.map((row) => row.year);

  // Y-axis: value in CAD
  const unrealisedReturn = rows.map((row) => row.unrealisedReturn);
  const livingCost = rows.map((row) => row.livingCost);

  const data = {
    labels,
    datasets: [
      {
        label: "Unrealised Return (CAD): ",
        data: unrealisedReturn,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.2,
      },
      {
        label: "Living Cost (CAD): ",
        data: livingCost,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x"
    },
    plugins: {
        tooltip: {
            mode: "index", // datasets based on x
            intersect: false,  // don't require mouse over on a point
            callbacks: {
                title: (items) => `Year ${items[0].label}`,
                label: (item) => {
                    const value = item.raw.toLocaleString();
                    return `${item.dataset.label} $${value}`;
                }
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "Year",
                font: { size: 14, weight: "bold" },
            }
        },
        y: {
            title: {
                display: true,
                text: "CAD",
                font: { size: 14, weight: "bold" },
            }
        }
    }
  }

  return (
    <Card className="p-5 shadow-sm my-4 rounded-4">
      <Card.Title className="mb-3">
        Investment Return vs. Living Cost (per year)
      </Card.Title>

      {rows.length === 0 ? (
        <p className="text-muted">No graph data.</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </Card>
  );
}
