import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { SunnyRainIcon, NightRainIcon } from "../components/WeatherIcons";

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "user",
      JSON.stringify({ username: formData.username })
    );
    window.location.href = "/dashboard";
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 4,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SunnyRainIcon size={120} />
        </Box>

        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ padding: 4 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={(theme) => ({
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 1,
                })}
              >
                {t("welcome")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#5C5C5C",
                  fontSize: "16px",
                }}
              >
                {t("loginSubtitle")}
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                name="username"
                type="text"
                label={t("username")}
                value={formData.username}
                onChange={handleChange}
                required
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00C0DB",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00C0DB",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#00C0DB",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#5C5C5C" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#00C0DB",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#00A8C5",
                  },
                }}
              >
                {t("login")}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <NightRainIcon size={120} />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
