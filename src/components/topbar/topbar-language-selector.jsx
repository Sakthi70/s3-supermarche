"use client";

import MenuItem from "@mui/material/MenuItem";
import TouchRipple from "@mui/material/ButtonBase"; 
// MUI ICON COMPONENTS

import ExpandMore from "@mui/icons-material/ExpandMore"; 
// TRANSLATION

import { useTranslation } from "react-i18next"; 
// GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";
import BazaarMenu from "components/BazaarMenu"; 
// ==============================================================


// ==============================================================
export default function LanguageSelector({
  languages
}) {
  const {
    i18n
  } = useTranslation();

  const handleChangeLanguage = lang => {
    localStorage.setItem('selectedLanguage', lang);
    i18n.changeLanguage(lang);
  };

  const selectedLanguage = languages[i18n.language];
  return <BazaarMenu handler={e => <TouchRipple className="handler marginRight" onClick={e}>
          <Span className="menuTitle">{selectedLanguage && selectedLanguage.title}</Span>
          <ExpandMore fontSize="inherit" />
        </TouchRipple>} options={onClose => {
    return Object.keys(languages).map(lang => <MenuItem className="menuItem" key={languages[lang].title} onClick={() => {
      handleChangeLanguage(lang);
      onClose();
    }}>
            <Span className="menuTitle">{languages[lang].title}</Span>
          </MenuItem>);
  }} />;
}