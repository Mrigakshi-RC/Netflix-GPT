import { useEffect } from "react";
import "./toast-message.css";

export const ToastMessage = ({ message, showToast, setShowToast }) => {
  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showToast, setShowToast, message]);

  return <div className={`toast ${showToast ? "show" : ""}`}>{message}</div>;
};
