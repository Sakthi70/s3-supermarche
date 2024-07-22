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

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; 
import { deleteCategory } from "actions/categories";
// ========================================================================


// ========================================================================
export default function CategoryRow({
  category,
  selected
}) {
  const {
    image,
    name,
    level,
    featured,
    id,
    slug
  } = category || {};
  const router = useRouter();
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const hasSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(`/admin/categories/${slug}`);
  const onDelete = async() => {
    await deleteCategory(id).then(() => router.push(`/admin/categories`) )
  };

  return <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
      <StyledTableCell align="left">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Avatar alt={name} src={image} sx={{
        borderRadius: 2
      }} />
      </StyledTableCell>

      <StyledTableCell align="left">{level}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={featuredCategory} onChange={() => setFeaturedCategory(state => !state)} />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={handleNavigate}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton onClick={onDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
}