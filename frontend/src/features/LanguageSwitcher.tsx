import { Button, Stack } from "@mui/material";

import { AppLanguage } from "~constants/LanguageConstants.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";
import { LanguageService } from "~utils/LanguageService.ts";

export const LanguageSwitcher = () => {
  const setLanguage = (language: AppLanguage) => {
    LanguageService.changeLanguage(language);
  };

  return (
    <Stack direction="row">
      <Button
        variant="outlined"
        sx={componentSx.leftButton}
        onClick={() => setLanguage(AppLanguage.EN)}
        disabled={LanguageService.currentLanguage === AppLanguage.EN}
      >
        {AppLanguage.EN}
      </Button>
      <Button
        variant="outlined"
        sx={componentSx.rightButton}
        onClick={() => setLanguage(AppLanguage.UK)}
        disabled={LanguageService.currentLanguage === AppLanguage.UK}
      >
        {AppLanguage.UK}
      </Button>
    </Stack>
  );
};

const componentSx = createSxStyles({
  leftButton: {
    borderBottomLeftRadius: "15%",
    borderTopLeftRadius: "15%",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  rightButton: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: "15%",
    borderTopRightRadius: "15%",
  },
});
