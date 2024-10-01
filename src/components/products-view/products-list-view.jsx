import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";
import FlexBetween from "components/flex-box/flex-between";
import { ProductCard9 } from "components/product-cards/product-card-9";
import { useState } from "react";
import { NO_IMAGE_FOR_PRODUCT } from "utils/constants";
import { formatCount } from "utils/util";
// CUSTOM DATA MODEL

// ==========================================================
export default function ProductsListView({ products }) {
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

  return (
    <div>
      {products.map((item) => (
        <ProductCard9
          id={item.id}
          key={item.id}
          title={item.name}
          price={item.price}
          salePrice={item.salePrice}
          imgUrl={
            item.images.length > 0 ? item.images[0] : NO_IMAGE_FOR_PRODUCT
          }
          tags={item.tags}
        />
      ))}

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">{displayItemCount()}</Span>
        <Pagination
          count={Math.ceil(products.length / countperPage)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </FlexBetween>
    </div>
  );
}
