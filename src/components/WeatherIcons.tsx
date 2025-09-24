import { Box } from "@mui/material";

interface WeatherIconProps {
  size?: number;
  style?: React.CSSProperties;
}

export const SunnyRainIcon = ({ size = 80, style }: WeatherIconProps) => (
  <Box
    sx={{
      width: size,
      height: size,
      position: "relative",
      ...style,
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "20%",
        left: "10%",
        width: "70%",
        height: "50%",
        backgroundColor: "#FFFFFF",
        borderRadius: "50px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          left: "20%",
          width: "60%",
          height: "60%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-10%",
          right: "10%",
          width: "50%",
          height: "50%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    />

    <Box
      sx={{
        position: "absolute",
        top: "5%",
        left: "5%",
        width: "35%",
        height: "35%",
        backgroundColor: "#FFD700",
        borderRadius: "50%",
        boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "120%",
          border: "3px solid #FFD700",
          borderRadius: "50%",
          opacity: 0.3,
        },
      }}
    />

    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
      <Box
        key={index}
        sx={{
          position: "absolute",
          top: "22.5%",
          left: "22.5%",
          width: "2px",
          height: "8px",
          backgroundColor: "#FFD700",
          borderRadius: "1px",
          transform: `rotate(${angle}deg) translateY(-15px)`,
          transformOrigin: "50% 15px",
        }}
      />
    ))}

    {[0, 1, 2, 3].map((index) => (
      <Box
        key={index}
        sx={{
          position: "absolute",
          top: "75%",
          left: `${25 + index * 15}%`,
          width: "3px",
          height: "12px",
          backgroundColor: "#4A90E2",
          borderRadius: "0 0 2px 2px",
          boxShadow: "0 2px 8px rgba(74, 144, 226, 0.3)",
        }}
      />
    ))}
  </Box>
);

export const NightRainIcon = ({ size = 80, style }: WeatherIconProps) => (
  <Box
    sx={{
      width: size,
      height: size,
      position: "relative",
      ...style,
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "20%",
        left: "10%",
        width: "70%",
        height: "50%",
        backgroundColor: "#FFFFFF",
        borderRadius: "50px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          left: "20%",
          width: "60%",
          height: "60%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-10%",
          right: "10%",
          width: "50%",
          height: "50%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    />

    <Box
      sx={{
        position: "absolute",
        top: "5%",
        right: "5%",
        width: "30%",
        height: "30%",
        backgroundColor: "#9B59B6",
        borderRadius: "50%",
        boxShadow: "0 4px 20px rgba(155, 89, 182, 0.3)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "10%",
          left: "-20%",
          width: "80%",
          height: "80%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50%",
        },
      }}
    />

    {[0, 1, 2].map((index) => (
      <Box
        key={index}
        sx={{
          position: "absolute",
          top: `${10 + index * 15}%`,
          left: `${5 + index * 10}%`,
          width: "3px",
          height: "3px",
          backgroundColor: "#9B59B6",
          borderRadius: "50%",
          boxShadow: "0 0 6px rgba(155, 89, 182, 0.6)",
        }}
      />
    ))}

    {[0, 1, 2].map((index) => (
      <Box
        key={index}
        sx={{
          position: "absolute",
          top: "75%",
          left: `${30 + index * 20}%`,
          width: "3px",
          height: "12px",
          backgroundColor: "#4A90E2",
          borderRadius: "0 0 2px 2px",
          boxShadow: "0 2px 8px rgba(74, 144, 226, 0.3)",
        }}
      />
    ))}
  </Box>
);

export const NightWindIcon = ({ size = 80, style }: WeatherIconProps) => (
  <Box
    sx={{
      width: size,
      height: size,
      position: "relative",
      ...style,
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "20%",
        left: "10%",
        width: "70%",
        height: "50%",
        backgroundColor: "#FFFFFF",
        borderRadius: "50px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-20%",
          left: "20%",
          width: "60%",
          height: "60%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-10%",
          right: "10%",
          width: "50%",
          height: "50%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    />

    <Box
      sx={{
        position: "absolute",
        top: "5%",
        right: "5%",
        width: "30%",
        height: "30%",
        backgroundColor: "#9B59B6",
        borderRadius: "50%",
        boxShadow: "0 4px 20px rgba(155, 89, 182, 0.3)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "10%",
          left: "-20%",
          width: "80%",
          height: "80%",
          backgroundColor: "#FFFFFF",
          borderRadius: "50%",
        },
      }}
    />

    {[0, 1, 2].map((index) => (
      <Box
        key={index}
        sx={{
          position: "absolute",
          top: `${10 + index * 15}%`,
          left: `${5 + index * 10}%`,
          width: "3px",
          height: "3px",
          backgroundColor: "#9B59B6",
          borderRadius: "50%",
          boxShadow: "0 0 6px rgba(155, 89, 182, 0.6)",
        }}
      />
    ))}

    {[0, 1, 2].map((index) => (
      <Box
        key={index}
        sx={{
          position: "absolute",
          top: "75%",
          left: `${20 + index * 25}%`,
          width: "20px",
          height: "2px",
          backgroundColor: "#FFFFFF",
          borderRadius: "1px",
          boxShadow: "0 2px 8px rgba(255, 255, 255, 0.3)",
          "&::before": {
            content: '""',
            position: "absolute",
            right: "-5px",
            top: "-2px",
            width: "8px",
            height: "6px",
            border: "2px solid #FFFFFF",
            borderLeft: "none",
            borderBottom: "none",
            borderRadius: "0 4px 0 0",
          },
        }}
      />
    ))}
  </Box>
);
