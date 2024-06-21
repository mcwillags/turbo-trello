import "~core/translations.ts";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { RegisterError } from "../../api/auth/AuthApiTypes.ts";
import { useNotification } from "../../context/NotificationContext.tsx";
import { useStore } from "../../context/StoreContext.tsx";
import smileyFaceImage from "~assets/images/auth_smiley.png";
import { AppPasswordTextField } from "~components/AppPasswordTextField.tsx";
import { AppPrimaryButton } from "~components/AppPrimaryButton.tsx";
import { ErrorMessage } from "~components/ErrorMessage.tsx";
import { ValidationConstants, validationKeys } from "~constants/ValidationConstants.ts";
import { Routes } from "~router/constants.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";
import { TranslationFunctions } from "~utils/TranslationFunctions.ts";

import { RegisterForm } from "./RegisterPageTypes.ts";

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { userStore } = useStore();
  const navigate = useNavigate();
  const { createNotification } = useNotification();
  const [httpErrorMessage, setHttpErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const emailFormControl = register("email", {
    required: {
      value: true,
      message: validationKeys.REQUIRED,
    },
    pattern: {
      value: ValidationConstants.EMAIL_REGEXP_PATTERN,
      message: validationKeys.EMAIL,
    },
  });
  const passwordFormControl = register("password", {
    required: {
      value: true,
      message: validationKeys.REQUIRED,
    },
    minLength: {
      value: ValidationConstants.MIN_PASSWORD_LENGTH,
      message: validationKeys.MIN_LENGTH,
    },
    maxLength: {
      value: ValidationConstants.MAX_PASSWORD_LENGTH,
      message: validationKeys.MAX_LENGTH,
    },
  });
  const privacyPolicyFormControl = register("privacyPolicy", {
    validate: (value: boolean) => value === true || validationKeys.NOT_CHECKED,
  });

  const translateValidationError = (error: FieldError | undefined) => {
    if (error === undefined || error.message === undefined) return;

    const translationParams = TranslationFunctions.getTranslationParams(error.message);

    if (!translationParams) return;

    return t(...translationParams);
  };

  const onRegisterSuccess = () => {
    createNotification(t("NOTIFICATION.REGISTER_SUCCESS"));

    navigate(Routes.LOGIN);
  };

  const onRegisterError = (error: RegisterError) => {
    setHttpErrorMessage(error.message);
  };

  const onSubmit = (formData: RegisterForm) => {
    userStore.registerUser(formData, onRegisterSuccess, onRegisterError);
  };

  const formCheckboxLabel = (
    <Typography>
      {t("REGISTER.CHECKBOX_TEXT_START")}{" "}
      <Typography component={Link} to={Routes.REGISTER}>
        {t("REGISTER.TERMS_OF_SERVICE")}
      </Typography>{" "}
      {t("REGISTER.CHECKBOX_TEXT_CONCATENATION")}{" "}
      <Typography component={Link} to={Routes.REGISTER}>
        {t("REGISTER.PRIVACY_POLICY")}
      </Typography>
    </Typography>
  );

  return (
    <Stack gap="3rem" alignItems="center" sx={componentSx.pageContainer}>
      <Paper sx={componentSx.formContainer} elevation={0} variant="outlined">
        <Stack component="form" gap="2rem" alignItems="center" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={componentSx.imageContainer}>
            <Box component="img" sx={componentSx.image} src={smileyFaceImage} alt="Smiley face" />
          </Box>

          <Stack gap="0.75rem" textAlign="center">
            <Typography variant="h2">{t("REGISTER.SIGN_UP_TO")} Trello Turbo</Typography>
            <Typography>
              {t("REGISTER.ALREADY_HAVE_ACCOUNT")}{" "}
              <Typography
                component={Link}
                variant="body2"
                to={Routes.LOGIN}
                sx={{ textDecoration: "none", whiteSpace: "nowrap" }}
              >
                {t("REGISTER.LOGIN_LINK")}
              </Typography>
            </Typography>
          </Stack>

          {httpErrorMessage && <ErrorMessage message={httpErrorMessage} />}

          <Stack gap="2rem" width="100%">
            <FormControl fullWidth error={!!errors.email}>
              <InputLabel htmlFor="email_input">{t("INPUT.EMAIL_ADDRESS_LABEL")}</InputLabel>
              <OutlinedInput id="email_input" label={t("INPUT.EMAIL_ADDRESS_LABEL")} {...emailFormControl} />
              <FormHelperText>{translateValidationError(errors.email)}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.password}>
              <InputLabel htmlFor="password_input">{t("INPUT.PASSWORD_LABEL")}</InputLabel>
              <AppPasswordTextField id="password_input" label={t("INPUT.PASSWORD_LABEL")} {...passwordFormControl} />
              <FormHelperText>{translateValidationError(errors.password)}</FormHelperText>
            </FormControl>

            <FormControl error={!!errors.privacyPolicy}>
              <FormControlLabel
                control={<Checkbox sx={{ marginTop: -1 }} color="secondary" />}
                {...privacyPolicyFormControl}
                label={formCheckboxLabel}
                sx={{ alignItems: "flex-start", gap: "0.5rem" }}
              />
              <FormHelperText>{translateValidationError(errors.privacyPolicy)}</FormHelperText>
            </FormControl>
          </Stack>

          <AppPrimaryButton type="submit" text={t("REGISTER.CONFIRM_BUTTON")} fullWidth />
        </Stack>
      </Paper>

      <Typography>@Trello Turbo team</Typography>
    </Stack>
  );
};

const componentSx = createSxStyles({
  pageContainer: {
    paddingBlock: "2rem",
  },
  formContainer: {
    width: "100%",
    maxWidth: "28rem",
    paddingBlock: "2.5rem",
    paddingInline: "2rem",
  },
  imageContainer: {
    maxWidth: "8rem",
    maxHeight: "8rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
