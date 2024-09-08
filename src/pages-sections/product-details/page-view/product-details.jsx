import Container from "@mui/material/Container";
// Local CUSTOM COMPONENTS

import ProductIntro from "../product-intro";
import RelatedProducts from "../related-products";
// CUSTOM DATA MODEL

// ==============================================================
export default function ProductDetailsPageView(props) {
  return (
    <Container className="mt-2 mb-2">
      <ProductIntro product={props.product} />

      {/* <RelatedProducts products={props.relatedProducts} /> */}
    </Container>
  );
}
