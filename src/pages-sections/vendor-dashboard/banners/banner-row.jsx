import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENT

import BazaarSwitch from "components/BazaarSwitch";
// STYLED COMPONENTS

import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import { deleteUpload } from "utils/cloudinary";
import useApp from "hooks/useApp";
import { stringAvatar } from "utils/util";
// ========================================================================

// ========================================================================
export default function BannerRow({ banner, selected }) {
  const { loading } = useApp();
  const { image, title, description, expiresOn, enabled } = banner || {};
  const router = useRouter();
  const hasSelected = selected.indexOf(title) !== -1;

  const handleNavigate = () => router.push(`/admin/banners/${slug}`);
  const onDelete = async () => {
    loading(true);
    if (image != "") {
      await deleteUpload(image, "Banners");
    }
    // await deleteCategory(id).then(() =>{
    //   catCrud.deleteCategory(id);
    //     })
    loading(false);
  };

  const onChange = async () => {
    loading(true);
    // await updateCategory( {enabled: !category.enabled},category.id).then(value => {
    //   catCrud.updateCategory(value);
    //  });
    loading(false);
  };

  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
      <StyledTableCell align="left">
        <CategoryWrapper>{title}</CategoryWrapper>
      </StyledTableCell>
      <StyledTableCell align="left">{description}</StyledTableCell>
      <StyledTableCell align="left">
       {!image ? "" : <Avatar
          {...stringAvatar(title, {
                borderRadius: 2,
              })}
           
        /> }
      </StyledTableCell>
      <StyledTableCell align="left">{expiresOn}</StyledTableCell>

      {/* <StyledTableCell align="left">
       {featured ? <Chip label="Featured" color="primary" /> : best ?  <Chip label="Best" color="secondary" /> : additional ? <Chip label="Additional" color="warning" /> : '' }
      </StyledTableCell> */}
      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={enabled} onChange={onChange} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={onDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
