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
import { deleteCategory, updateCategory } from "actions/categories";
import { deleteUpload } from "utils/cloudinary";
import useApp from "hooks/useApp";
import { Chip } from "@mui/material";
import { stringAvatar } from "utils/util";
import { NO_IMAGE } from "utils/constants";
// ========================================================================

// ========================================================================
export default function CategoryRow({ category,  selected,slugId }) {
  const {loading, categories: catCrud} = useApp();
  const { image, name,  enabled, id, slug,featured,best, additional,_count } = category || {};
  const router = useRouter();
  // const [featuredCategory, setFeaturedCategory] = useState(featured);
  const hasSelected = selected.indexOf(name) !== -1;

  const handleNavigate = () => router.push(slugId? `/admin/categories/${id}/${slugId}`: `/admin/categories/${id}`);
  const onDelete = async() => {
    loading(true);
    if(image !=''){
      await deleteUpload(image, 'Category')
    }
    await deleteCategory(id).then(() =>{
      catCrud.deleteCategory(id);
        })
       loading(false)
  };

  const onChange =async() =>{
    loading(true);
    await updateCategory( {enabled: !category.enabled},category.id).then(value => {
      catCrud.updateCategory(value);
     });
     loading(false)
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
    
      <StyledTableCell align="left">
        <CategoryWrapper>{name}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        {image && 
        <Avatar
alt={name} src={(image && image !== '')  ? image: NO_IMAGE} sx={ {borderRadius: 2}}
        />}
      </StyledTableCell>
      <StyledTableCell align="left">{slug}</StyledTableCell>

      <StyledTableCell align="left">{slug.match(/\//ig).length}</StyledTableCell>

      <StyledTableCell align="left">
       {featured ? <Chip label="Featured" color="primary" /> : best ?  <Chip label="Best" color="secondary" /> : additional ? <Chip label="Additional" color="warning" /> : '' }
      </StyledTableCell>
      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={enabled}
          onChange={onChange}
        />
      </StyledTableCell>

      <StyledTableCell align="center" sx={{width:150}}>
        <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye onClick={() =>router.push(`/admin/categories/view/${id}`)}/>
        </StyledIconButton>

       {_count.categories < 1  && _count.products < 1 && <StyledIconButton onClick={onDelete}>
          <Delete />
        </StyledIconButton>}
      </StyledTableCell>
    </StyledTableRow>
  );
}
