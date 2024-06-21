import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Box, FormControl, Input, Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";

import { useBooleanToggle } from "../hooks/useBooleanToggle.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";

interface EditableFieldProps {
  value: string;
  onEdit: (data: EditableFieldForm) => void;
}

export interface EditableFieldForm {
  value: string;
}

export const EditableField = ({ value, onEdit }: EditableFieldProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditableFieldForm>({
    values: {
      value,
    },
  });
  const [isEditing, toggleEditing, setIsEditing] = useBooleanToggle();

  const onSubmit = (data: EditableFieldForm) => {
    onEdit(data);

    setIsEditing(false);
  };

  return (
    <Box sx={componentSx.container}>
      {!isEditing ? (
        <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
          <Typography sx={componentSx.text}>{value}</Typography>
          <IconButton onClick={() => toggleEditing()}>
            <EditIcon color="action" />
          </IconButton>
        </Stack>
      ) : (
        <Stack sx={componentSx.form} direction="row" gap={1} component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={!!errors.value} fullWidth>
            <Input sx={componentSx.input} {...register("value")} required />
          </FormControl>
          <IconButton onClick={() => setIsEditing(false)}>
            <CloseIcon color="error" />
          </IconButton>
          <IconButton type="submit">
            <CheckIcon color="success" />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};

const componentSx = createSxStyles({
  container: {
    maxWidth: "100%",
    flexGrow: 1,
    overflow: "hidden",
  },
  text: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  form: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  input: {
    padding: 0,
  },
});
