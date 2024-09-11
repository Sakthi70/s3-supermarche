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
import { Box, Card, Chip, Divider, IconButton, Typography } from "@mui/material";
import { stringAvatar } from "utils/util";
import Image from "next/image";
import { Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
// ========================================================================

// ========================================================================
export default function CategoryGrid({ category,  selected,slugId }) {
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
    <Card elevation={2}>
    <Box height={200} textAlign={"center"} >
      <Box>
      <Image src={image} alt={category.name} width={100} height={100} />
        <Typography p={1} height={50} mb={1} className="title-2" color={'textSecondary'}>{name}</Typography>
      </Box>
      <Divider />
      <Box alignItems="center" >
        <StyledIconButton onClick={handleNavigate}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye
            onClick={() => router.push(`/admin/categories/view/${id}`)}
          />
        </StyledIconButton>

        {_count.categories < 1 && _count.products < 1 && (
          <StyledIconButton onClick={onDelete}>
            <Delete />
          </StyledIconButton>
        )}
      </Box>
    </Box>
    </Card>
  );
}
