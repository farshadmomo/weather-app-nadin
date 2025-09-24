import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Alert,
  Snackbar,
  CircularProgress,
  Chip,
} from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { lazy, Suspense } from "react";
const TemperatureChart = lazy(() => import("../components/TemperatureChart"));
import ForecastCard from "../components/ForecastCard";
import { getCurrentWeather, getWeatherForecast } from "../WeatherService";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

interface DashboardProps {
  selectedLocation: string;
}

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastData {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  dt_txt: string;
}

type DayForecast = {
  day: string;
  icon: string;
  temp: number;
  rawMain?: string;
};

const Dashboard = ({ selectedLocation }: DashboardProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city),
      ]);

      setCurrentWeather(currentData);
      setForecast(forecastData as ForecastData[]);
    } catch (err) {
      setError(t("cityNotFound"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedLocation);
  }, [selectedLocation]);

  const handleCloseError = () => {
    setError(null);
  };

  const getChartSeries = () => {
    if (!forecast.length)
      return { labels: [] as string[], values: [] as number[] };
    const byDay = new Map<string, number[]>();
    for (const f of forecast) {
      const d = new Date(f.dt_txt);
      const dayKey = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      ).getTime();
      const key = String(dayKey);
      const arr = byDay.get(key) ?? [];
      arr.push(f.main.temp);
      byDay.set(key, arr);
    }
    const sortedKeys = Array.from(byDay.keys())
      .sort((a, b) => Number(a) - Number(b))
      .slice(0, 7);
    const labels = sortedKeys.map((k) => {
      const d = new Date(Number(k));
      return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    });
    const values = sortedKeys.map((k) => {
      const arr = byDay.get(k)!;
      const avg = arr.reduce((s, v) => s + v, 0) / arr.length;
      return Math.round(avg);
    });
    return { labels, values };
  };

  const getForecastData = (): DayForecast[] => {
    if (forecast.length > 0) {
      const byDay: Record<string, ForecastData[]> = {};
      for (const item of forecast) {
        const d = new Date(item.dt_txt);
        const dayStart = new Date(
          d.getFullYear(),
          d.getMonth(),
          d.getDate()
        ).getTime();
        const key = String(dayStart);
        if (!byDay[key]) byDay[key] = [];
        byDay[key].push(item);
      }
      const keys = Object.keys(byDay).sort((a, b) => Number(a) - Number(b));

      const days: DayForecast[] = keys.map((key, index) => {
        const items = byDay[key];
        const temps = items.map((i) => i.main.temp);
        const avg = temps.reduce((s, v) => s + v, 0) / temps.length;
        const d = new Date(Number(key));
        let dayName: string;
        if (isFa) {
          dayName =
            index === 0
              ? t("today")
              : dayjs(d).calendar("jalali").locale("fa").format("dddd");
        } else {
          dayName =
            index === 0
              ? t("today")
              : d.toLocaleDateString("en-US", { weekday: "long" });
        }
        const mainWx = items[0]?.weather?.[0]?.main || "Clouds";
        const icon = getWeatherIcon(mainWx);
        return {
          day: dayName,
          icon,
          temp: Math.round(avg),
          rawMain: mainWx,
        };
      });
      return days;
    }
    return [];
  };

  const getWeatherIcon = (weatherMain: string) => {
    const main = weatherMain.toLowerCase();
    if (main.includes("clear")) return "☀️";
    if (main.includes("cloud")) return "⛅";
    if (main.includes("rain")) return "🌧️";
    if (main.includes("storm")) return "⛈️";
    if (main.includes("snow")) return "❄️";
    return "🌤️";
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  dayjs.extend(jalaliday);
  const isFa =
    typeof window !== "undefined" &&
    (localStorage.getItem("i18nextLng")?.startsWith("fa") ||
      navigator.language.startsWith("fa"));
  const getDayName = () => {
    if (isFa) {
      return dayjs().calendar("jalali").locale("fa").format("dddd");
    }
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };
  const getDateShort = () => {
    if (isFa) {
      return dayjs().calendar("jalali").locale("fa").format("DD MMM, YYYY");
    }
    return new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 4,
          mb: 4,
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
            padding: 4,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0px 8px 24px rgba(0,0,0,0.5)"
                : "0px 4px 20px rgba(0, 0, 0, 0.08)",
            border: `1px solid ${theme.palette.divider}`,
            position: "relative",
            overflow: "hidden",
          })}
        >
          <Box
            sx={(theme) => ({
              position: "absolute",
              inset: 0,
              backgroundColor:
                theme.palette.mode === "dark" ? "#2F3445" : "#E7EDF3",
              opacity: theme.palette.mode === "dark" ? 0.9 : 0.5,
              zIndex: 0,
            })}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Chip
              icon={<LocationOnOutlined />}
              label={selectedLocation}
              sx={(theme) => ({
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.16)"
                    : "rgba(0,0,0,0.06)",
                color: theme.palette.text.primary,
                borderRadius: 999,
                px: 1.5,
                mb: 3,
                "& .MuiChip-label": { fontWeight: 600 },
              })}
            />

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <CircularProgress sx={{ color: "#00C0DB" }} />
              </Box>
            ) : currentWeather ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    sx={(theme) => ({
                      fontWeight: 800,
                      color: theme.palette.text.primary,
                      mb: 1.5,
                      fontSize: "44px",
                    })}
                  >
                    {getDayName()}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 6, mb: 4 }}>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.text.primary,
                        fontSize: "18px",
                      })}
                    >
                      {getDateShort()}
                    </Typography>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.text.primary,
                        fontSize: "18px",
                      })}
                    >
                      {getCurrentTime()}
                    </Typography>
                  </Box>
                  <Typography
                    sx={(theme) => ({
                      fontWeight: 800,
                      color: theme.palette.text.primary,
                      fontSize: "64px",
                      lineHeight: 1,
                    })}
                  >
                    {Math.round(currentWeather.main.temp)}° C
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      color: theme.palette.text.primary,
                      fontSize: "18px",
                      mt: 1,
                    })}
                  >
                    {t("high")}: {Math.round(currentWeather.main.temp_max)}{" "}
                    {t("low")}: {Math.round(currentWeather.main.temp_min)}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      fontSize: "100px",
                      mb: 1,
                      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                    }}
                  >
                    {getWeatherIcon(currentWeather.weather[0].main)}
                  </Box>
                  <Typography
                    sx={(theme) => ({
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      fontSize: "56px",
                      mb: 1,
                      textTransform: "capitalize",
                    })}
                  >
                    {isFa
                      ? t(currentWeather.weather[0].main)
                      : currentWeather.weather[0].main}
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      color: theme.palette.text.primary,
                      fontSize: "24px",
                    })}
                  >
                    {t("feelsLike")}{" "}
                    {Math.round(currentWeather.main.feels_like)}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <Typography
                  sx={(theme) => ({ color: theme.palette.text.secondary })}
                >
                  No weather data available
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Suspense fallback={<Box sx={{ p: 3 }} />}>
          {(() => {
            const { labels, values } = getChartSeries();
            return <TemperatureChart labels={labels} values={values} />;
          })()}
        </Suspense>
      </Box>

      <Box>
        <Typography
          variant="h5"
          sx={(theme) => ({
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 3,
            fontSize: "20px",
          })}
        >
          {t("forecast")}
        </Typography>

        <Box
          sx={(theme) => ({
            display: "flex",
            gap: 3,
            overflowX: "auto",
            flexWrap: "nowrap",
            pt: 3,
            pb: 3,
            px: 1,
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.background.default,
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            },
          })}
        >
          {getForecastData().map((day, index) => (
            <ForecastCard
              key={index}
              day={day.day}
              icon={day.icon}
              temperature={day.temp}
              isToday={index === 0}
            />
          ))}
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
