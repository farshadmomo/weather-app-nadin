import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

interface WeatherCardProps {
  title: string;
  temperature: number;
  description: string;
  humidity?: number;
  windSpeed?: number;
  pressure?: number;
  feelsLike?: number;
  date?: string;
  isCurrent?: boolean;
}

const WeatherCard = ({
  title,
  temperature,
  description,
  humidity,
  windSpeed,
  pressure,
  feelsLike,
  date,
  isCurrent = false,
}: WeatherCardProps) => {
  const { t } = useTranslation();

  const getWeatherIcon = (desc: string) => {
    const description = desc.toLowerCase();
    if (description.includes("clear")) return "☀️";
    if (description.includes("cloud")) return "☁️";
    if (description.includes("rain")) return "🌧️";
    if (description.includes("snow")) return "❄️";
    if (description.includes("storm")) return "⛈️";
    if (description.includes("mist") || description.includes("fog"))
      return "🌫️";
    return "🌤️";
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid #F0F0F0",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant={isCurrent ? "h6" : "subtitle1"}
              sx={{
                fontWeight: 600,
                color: "#1E1E1E",
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            {date && (
              <Typography
                variant="body2"
                sx={{
                  color: "#5C5C5C",
                  fontSize: "14px",
                }}
              >
                {date}
              </Typography>
            )}
          </Box>
          <Typography
            sx={{
              fontSize: isCurrent ? "48px" : "32px",
              lineHeight: 1,
            }}
          >
            {getWeatherIcon(description)}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant={isCurrent ? "h3" : "h4"}
            sx={{
              fontWeight: 700,
              color: "#00C0DB",
              mb: 1,
            }}
          >
            {Math.round(temperature)}°C
          </Typography>
          <Chip
            label={description}
            sx={{
              backgroundColor: "#F0F8FF",
              color: "#00C0DB",
              fontWeight: 500,
              borderRadius: 2,
              textTransform: "capitalize",
            }}
          />
        </Box>

        {isCurrent && (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {feelsLike && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#5C5C5C", mb: 0.5 }}>
                  {t("feelsLike")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#1E1E1E" }}
                >
                  {Math.round(feelsLike)}°C
                </Typography>
              </Box>
            )}
            {humidity && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#5C5C5C", mb: 0.5 }}>
                  {t("humidity")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#1E1E1E" }}
                >
                  {humidity}%
                </Typography>
              </Box>
            )}
            {windSpeed && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#5C5C5C", mb: 0.5 }}>
                  {t("windSpeed")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#1E1E1E" }}
                >
                  {windSpeed} m/s
                </Typography>
              </Box>
            )}
            {pressure && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#5C5C5C", mb: 0.5 }}>
                  {t("pressure")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#1E1E1E" }}
                >
                  {pressure} hPa
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
