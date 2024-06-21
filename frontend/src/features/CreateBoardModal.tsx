import { FormControl, FormHelperText, InputLabel, Modal, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import { FieldError, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ICreateBoard } from "../api/board/BoardApiTypes.ts";
import { useModal } from "../context/ModalContext.tsx";
import { useStore } from "../context/StoreContext.tsx";
import { AppPrimaryButton } from "~components/AppPrimaryButton.tsx";
import { validationKeys } from "~constants/ValidationConstants.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";
import { TranslationFunctions } from "~utils/TranslationFunctions.ts";

export const CreateBoardModal = () => {
  const { closeModal } = useModal();
  const { boardStore } = useStore();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateBoard>();

  const titleFormControl = register("title", {
    required: {
      value: true,
      message: validationKeys.REQUIRED,
    },
  });

  const translateValidationError = (error: FieldError | undefined) => {
    if (error === undefined || error.message === undefined) return;

    const translationParams = TranslationFunctions.getTranslationParams(error.message);

    if (!translationParams) return;

    return t(...translationParams);
  };

  const onSubmit = (data: ICreateBoard) => {
    boardStore.createBoard(data);

    closeModal();
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={componentSx.form}>
        <Stack gap="2rem">
          <Typography variant="h5">{t("CREATE_BOARD_MODAL.TITLE")}</Typography>

          <Stack gap="2rem" width="100%">
            <FormControl fullWidth error={!!errors.title}>
              <InputLabel htmlFor="email_input">{t("INPUT.TITLE_LABEL")}</InputLabel>
              <OutlinedInput id="email_input" label={t("INPUT.TITLE_LABEL")} {...titleFormControl} />
              <FormHelperText>{translateValidationError(errors.title)}</FormHelperText>
            </FormControl>
          </Stack>

          <AppPrimaryButton type="submit" text={t("CREATE_BOARD_MODAL.CONFIRM")} fullWidth />
        </Stack>
      </Paper>
    </Modal>
  );
};

const componentSx = createSxStyles({
  container: {
    width: "100%",
    height: "100%",
  },
  form: {
    width: "100%",
    maxWidth: "40rem",
    paddingInline: "2rem",
    paddingBlock: "2.5rem",

    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});
