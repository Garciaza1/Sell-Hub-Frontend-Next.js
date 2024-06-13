import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SaleData {
  venda_data: string;
  total_vendas: number;
  quantidade: number;
}

interface DoDiaProps {
  salesData: SaleData[];
}
const QntdXvalor: React.FC<DoDiaProps> = ({ salesData }) => {
  if (!salesData) {
    return <p>No sales data available</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // meses são indexados de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedDates = salesData.map((sale) => formatDate(sale.venda_data));

  const data: ChartData<"line"> = {
    labels: formattedDates,
    datasets: [
      {
        
        label: "Total Vendas Quantidade X Valor",
        data: salesData.map((sale) => sale.quantidade),
        fill: false,
        backgroundColor: "rgb(239, 0, 0)",
        borderColor: "rgba(239, 0, 0, 0.2)",
      },
      {
        
        label: "Total Vendas Quantidade X Valor",
        data: salesData.map((sale) => sale.total_vendas),
        fill: false,
        backgroundColor: "#8b5cf6",
        borderColor: "#8b5cf6",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Total Vendas Quantidade",
        },
      },
    },
  };

  return (
    <div className="mx-10 font-bold h-96 my-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default QntdXvalor;
