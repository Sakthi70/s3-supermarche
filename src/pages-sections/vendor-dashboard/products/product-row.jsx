import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar"; 
// MUI ICON COMPONENTS

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye"; 
// GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography"; 
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "lib"; 
// STYLED COMPONENTS

import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles"; 
import { Box, Typography } from "@mui/material";
import { NO_IMAGE } from "utils/constants";
import ProductPrice from "components/product-cards/product-price";
import ProductViewDialog from "components/products-view/product-view-dialog";
import Link from "next/link";
import Warning from "components/warning/warning";
import { deleteProduct } from "actions/products";
import useApp from "hooks/useApp";
// ========================================================================


// ========================================================================
export default function ProductRow({
  product,
  categories,
  onDeleteProduct
}) {
  const {
    name,
    salePrice,
    price,
    images,
    stock,
    value,
    enabled,
    id,
    published,
    slug
  } = product || {};
  const router = useRouter();
  const {loading}=useApp();
  const [productPublish, setProductPublish] = useState(published);
  const [openDailog, setopenDailog] = useState(false);
  const [openDelete, setopenDelete] = useState(false);
  const category = categories.find(x=> x.id === product.categoryId).name ?? ""
  
  const onDelete =async() =>{
    loading(true)
    setopenDelete(false);
        await onDeleteProduct(id);
        loading(false)
  }

  return <StyledTableRow tabIndex={-1} role="checkbox">
     <ProductViewDialog  isPreview={true} openDialog={openDailog} handleCloseDialog={() => {setopenDailog(!openDailog)}} product={product}  />
      <Warning open={openDelete} handleClose={() => setopenDelete(false)} content={'Are you sure to delete the product?'} submit="Confirm" ok={'Cancel'} title={'Delete Product'} onSubmit={onDelete} isSubmit={true}/>
      <StyledTableCell align="left">
      <Link href={ `/products/${id}?isPreview=true`} >
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar alt={name} src={images.length > 0 ? images[0]: NO_IMAGE} sx={{
          borderRadius: 2
        }} />

          <div>
            <Paragraph fontWeight={600}>{name}</Paragraph>
            <Small color="grey.600">#{id.split("-")[0]}</Small>
          </div>
        </FlexBox>
        </Link>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      {/* <StyledTableCell align="left">
        <Avatar src={brand} sx={{
        width: 55,
        height: "auto",
        borderRadius: 0
      }} />
      </StyledTableCell> */}

      <StyledTableCell align="left">{
       <ProductPrice discount={salePrice} price={price} />}</StyledTableCell>
       <StyledTableCell align="left"><ProductStock stock={stock}/></StyledTableCell>
       <StyledTableCell align="center">{value}</StyledTableCell>
      <StyledTableCell align="left">
        <BazaarSwitch color="info" checked={enabled} onChange={() => setProductPublish(state => !state)} />
      </StyledTableCell>

      <StyledTableCell align="center" sx={{minWidth:150}}>
        <StyledIconButton onClick={() => router.push(`/admin/products/${id}`)}>
          <Edit />
        </StyledIconButton>

        <StyledIconButton onClick={() => setopenDailog(true)}>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton onClick={() => setopenDelete(true)}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>;
}



export const ProductStock = ({stock}) => {
  const isStock = stock >0;
  return (
    <Box display={'flex'} gap={1}>
        <Typography fontWeight={600} color={isStock ?'success':"error"}>{isStock?"In Stock":"Out of Stock"}</Typography>
        {isStock && <Typography fontWeight={500} color="textSecondary" variant="caption">{`(${stock})`}</Typography>}
    </Box>
  )
}
