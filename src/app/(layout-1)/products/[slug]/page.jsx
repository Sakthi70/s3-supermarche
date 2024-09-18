import { getProductById } from "actions/products";
import { notFound } from "next/navigation"; 
// PAGE VIEW COMPONENT

import { ProductDetailsPageView } from "pages-sections/product-details/page-view"; 
// API FUNCTIONS

import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
export const metadata = {
  title: "Product Details - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function ProductDetails({
  params
}) {
  console.log(params)
  try {
    const product = await getProductById(params.slug);
    const relatedProducts = await getRelatedProducts();
    const frequentlyBought = await getFrequentlyBought();
    return <ProductDetailsPageView product={product} relatedProducts={relatedProducts} frequentlyBought={frequentlyBought} />;
  } catch (error) {
    notFound();
  }
}