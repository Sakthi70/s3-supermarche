"use client"
import ChevronRight from "@mui/icons-material/ChevronRight"; 
// GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography";
import CategoryMenu from "components/categories/category-menu"; 
// CUSTOM ICON COMPONENT

import Category from "icons/Category"; 
// STYLED COMPONENT

import { CategoryMenuButton } from "./styles";
import { t } from "utils/util";
import { IconButton, useMediaQuery } from "@mui/material";
export default function Categories() {
  const DOWN_1150 = useMediaQuery(theme => theme.breakpoints.down(1150));
  return <CategoryMenu render={handler => <>
  {!DOWN_1150 ? <CategoryMenuButton variant="text" onClick={e => handler(e)}>
          <div className="prefix">
            <Category fontSize="small" />
            <Paragraph fontWeight={600}>{t("Categories")}</Paragraph>
          </div>

          <ChevronRight className="dropdown-icon" fontSize="small" />
        </CategoryMenuButton> :   <IconButton disableFocusRipple onClick={e => handler(e)}> <Category fontSize="small" /></IconButton>}</>} />;
}