import { Alert } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Alert sx={{ width: "100%" }} severity="error">
      {message}
    </Alert>
  );
};
