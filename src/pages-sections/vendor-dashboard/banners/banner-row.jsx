import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
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
import { formatDate } from "date-fns";
import { deleteBanner } from "actions/banner";
// ========================================================================

// ========================================================================
export default function BannerRow({ banner, selected,refetch }) {
  const { loading } = useApp();
  const { id,image, title, description, expires, enabled } = banner || {};
  const router = useRouter();
  const hasSelected = selected.indexOf(title) !== -1;

  const handleNavigate = () => router.push(`/admin/banners/${id}`);
  const onDelete = async () => {
    loading(true);
    if (image != "") {
      await deleteUpload(image, "Banners");
    }
    await deleteBanner(id).then(async() =>{
      await refetch();
        })
    loading(false);
  };

  const onChange = async () => {
    loading(true);
    // await updateCategory( {enabled: !category.enabled},category.id).then(value => {
    //   catCrud.updateCategory(value);
    //  });
    loading(false);
  };

  console.log(banner)
  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={hasSelected}>
      <StyledTableCell align="left">
        <CategoryWrapper>{title}</CategoryWrapper>
      </StyledTableCell>
      <StyledTableCell align="left"> <div dangerouslySetInnerHTML={{__html: description}} /></StyledTableCell>
      <StyledTableCell align="left">
       {image ? <Avatar src={image} alt={title} sx={{borderRadius:0}}/> : <Avatar
          {...stringAvatar(title, {
                borderRadius: 2,
              })}
           
        /> }
      </StyledTableCell>
      <StyledTableCell align="left">{expires !=null ? formatDate(expires,'dd-MM-yyyy'):''}</StyledTableCell>

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
