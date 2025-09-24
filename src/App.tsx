import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { useState, Suspense, lazy } from "react";
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./i18n";

function App() {
  const user = localStorage.getItem("user");
  const [selectedLocation, setSelectedLocation] = useState("Tehran");
  const [loading, setLoading] = useState(false);

  const handleLocationChange = (location: string) => {
    setLoading(true);
    setSelectedLocation(location);

    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Header
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            loading={loading}
          />
          <Suspense fallback={<Box sx={{ p: 4 }} />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  user ? (
                    <Dashboard selectedLocation={selectedLocation} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Suspense>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
