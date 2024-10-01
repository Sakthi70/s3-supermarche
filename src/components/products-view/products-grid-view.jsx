import { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination"; 
// GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/product-card-1/product-card";
import { calculateDiscountPercentage, formatCount } from "utils/util";
// CUSTOM DATA MODEL


// ========================================================
export default function ProductsGridView({
  products
}) {
  const countperPage = 10;
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const displayItemCount = () => {
    const start = (page - 1) * countperPage + 1;
    const end = Math.min(page * countperPage, products.length);
    return `Showing ${start}-${end} of ${formatCount(products.length)} Products`;
  };
  return <Fragment>
      <Grid container spacing={3}>
        {products.slice((page - 1) *countperPage,((page - 1) *countperPage)+countperPage).map(item => <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1 hideRating id={item.id} slug={item.slug} price={item.price} title={item.name} imgUrl={item.images} discount={calculateDiscountPercentage(item.price,item.salePrice)} productData={item} />
          </Grid>)}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={6}>
        <Span color="grey.600">{displayItemCount()}</Span>
        <Pagination count={Math.ceil(products.length / countperPage)} page={page} onChange={handleChange}  variant="outlined" color="primary" />
      </FlexBetween>
    </Fragment>;
}