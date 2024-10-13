import Box from "@mui/material/Box"; 
// GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard1 from "components/product-cards/product-card-1"; 
import { calculateDiscountPercentage } from "utils/util";
// CUSTOM DATA MODEL


// =======================================================
export default function ProductCarousel({
  products,
  title
}) {
  const responsive = [{
    breakpoint: 1440,
    settings: {
      slidesToShow: 3
    }
  }, {
    breakpoint: 950,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 500,
    settings: {
      slidesToShow: 1
    }
  }];
  return <div className="mb-3">
      <H3 fontSize={25} mb={3}>
        {title}
      </H3>

      <Carousel slidesToShow={4} responsive={responsive}>
        {products.map(item => <Box py={0.5} key={item.id}>
            <ProductCard1 hideRating id={item.id} slug={item.slug} variant={item.value} price={item.price} salePrice={item.salePrice} title={item.name} rating={item.rating} imgUrl={item.images} discount={calculateDiscountPercentage(item.price,item.offerPrice)} productData={item} />
          </Box>)}
      </Carousel>
    </div>;
}