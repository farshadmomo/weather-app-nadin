import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  LightMode,
  DarkMode,
  Language,
  ExitToApp,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

const SettingsMenu = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleClose();
  };

  const handleLanguageChange = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="settings"
        onClick={handleClick}
        sx={{
          color: "#666666",
          padding: "8px",
          border: "1px solid #E5E5E5",
          borderRadius: "8px",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            borderColor: "#CCCCCC",
          },
        }}
      >
        <SettingsIcon sx={{ fontSize: "20px" }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {isDarkMode ? (
              <LightMode sx={{ fontSize: "20px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "20px" }} />
            )}
          </ListItemIcon>
          <ListItemText>
            {isDarkMode ? t("lightMode") : t("darkMode")}
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLanguageChange}>
          <ListItemIcon>
            <Language sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          <ListItemText>
            {i18n.language === "en" ? "فارسی" : "English"}
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ color: "#F44336" }}>
          <ListItemIcon>
            <ExitToApp sx={{ fontSize: "20px", color: "#F44336" }} />
          </ListItemIcon>
          <ListItemText>{t("logout")}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;
