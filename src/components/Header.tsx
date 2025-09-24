import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import SettingsMenu from "./SettingsMenu";

interface HeaderProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  loading?: boolean;
}

const Header = ({
  selectedLocation,
  onLocationChange,
  loading = false,
}: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        sx={(theme) => ({
          background: theme.palette.background.paper,
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Toolbar
          sx={{
            minHeight: "64px",
            paddingX: { xs: 2, sm: 3 },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              fontWeight: 600,
              fontSize: "18px",
              letterSpacing: "-0.01em",
            })}
          >
            {t("weatherApp")}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel sx={{ fontSize: "14px" }}>
                {t("searchCity")}
              </InputLabel>
              <Select
                value={selectedLocation}
                label={t("searchCity")}
                onChange={(e) => onLocationChange(e.target.value)}
                disabled={loading}
                sx={(theme) => ({
                  height: "40px",
                  fontSize: "14px",
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: 2,
                  },
                })}
                endAdornment={
                  loading ? (
                    <CircularProgress
                      size={20}
                      sx={(theme) => ({
                        color: theme.palette.primary.main,
                        mr: 1,
                      })}
                    />
                  ) : null
                }
              >
                <MenuItem value="San Francisco">{t("San Francisco")}</MenuItem>
                <MenuItem value="New York">{t("New York")}</MenuItem>
                <MenuItem value="London">{t("London")}</MenuItem>
                <MenuItem value="Tokyo">{t("Tokyo")}</MenuItem>
                <MenuItem value="Tehran">{t("Tehran")}</MenuItem>
              </Select>
            </FormControl>
            <SettingsMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
