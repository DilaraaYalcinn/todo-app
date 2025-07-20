import React, { useEffect } from "react";
import { Typography } from "@mui/material";

interface NotificationProps {
  message: string | null;
  type: "success" | "error";
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message && onClose) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;
  return (
    <Typography
      align="center"
      sx={{ my: 2, fontWeight: "bold", color: "success.main" }}
    >
      {message}
    </Typography>
  );
};

export default Notification;
