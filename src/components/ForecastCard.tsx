import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ForecastCardProps {
  day: string;
  icon: string;
  temperature: number;
  isToday?: boolean;
}

const ForecastCard = ({
  day,
  icon,
  temperature,
  isToday = false,
}: ForecastCardProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 3,
        padding: 3,
        textAlign: "center",
        minWidth: 100,
        boxShadow: isToday
          ? theme.palette.mode === "dark"
            ? "0px 8px 25px rgba(0,0,0,0.6)"
            : "0px 8px 25px rgba(0, 192, 219, 0.15)"
          : theme.palette.mode === "dark"
          ? "0px 4px 15px rgba(0,0,0,0.5)"
          : "0px 4px 15px rgba(0, 0, 0, 0.08)",
        border: isToday
          ? `2px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          boxShadow: isToday
            ? theme.palette.mode === "dark"
              ? "0px 12px 35px rgba(0,0,0,0.7)"
              : "0px 12px 35px rgba(0, 192, 219, 0.2)"
            : theme.palette.mode === "dark"
            ? "0px 8px 25px rgba(0,0,0,0.6)"
            : "0px 8px 25px rgba(0, 0, 0, 0.12)",
          transform: "translateY(-3px)",
        },
      })}
    >
      {isToday && (
        <Box
          sx={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#00C0DB",
            color: "white",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "10px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {t("today")}
        </Box>
      )}

      <Typography
        variant="body2"
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          fontWeight: isToday ? 600 : 500,
          color: isToday
            ? theme.palette.primary.main
            : theme.palette.text.secondary,
          mb: 2,
          fontSize: "13px",
          textTransform: "capitalize",
        })}
      >
        {day}
      </Typography>

      <Box
        sx={{
          fontSize: "32px",
          mb: 2,
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h6"
        sx={(theme) => ({
          fontWeight: 700,
          color: theme.palette.text.primary,
          fontSize: "16px",
        })}
      >
        {temperature}°C
      </Typography>
    </Box>
  );
};

export default ForecastCard;
