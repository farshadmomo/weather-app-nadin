import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
  type ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface TemperatureChartProps {
  labels: string[];
  values: number[];
}

const TemperatureChart = ({ labels, values }: TemperatureChartProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
  );

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: t("averageMonthlyTemperature"),
        data: values,
        borderColor: theme.palette.primary.main,
        backgroundColor: (ctx: ScriptableContext<"line">) => {
          const { chart } = ctx;
          const { ctx: canvasCtx, chartArea } = chart || {};
          if (!chartArea) return theme.palette.primary.main;
          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, `${theme.palette.primary.main}4D`);
          gradient.addColorStop(1, `${theme.palette.primary.main}0D`);
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: "#00C0DB",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => `${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme.palette.text.secondary },
      },
      y: {
        grid: { color: theme.palette.divider },
        ticks: {
          color: theme.palette.text.secondary,
          callback: (value) => `${value}°C`,
        },
      },
    },
    elements: {
      line: { borderWidth: 3 },
      point: { hoverRadius: 6 },
    },
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        padding: 3,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 6px 18px rgba(0,0,0,0.5)"
            : "0px 4px 20px rgba(0, 0, 0, 0.08)",
        border: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Typography
        variant="h6"
        sx={(theme) => ({
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 3,
        })}
      >
        {t("averageMonthlyTemperature")}
      </Typography>

      <Box sx={{ height: 200 }}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TemperatureChart;
