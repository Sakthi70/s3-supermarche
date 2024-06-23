import { WishListPageView } from "pages-sections/customer-dashboard/wish-list"; 
// API FUNCTIONS

import { getWishListProducts } from "utils/__api__/wish-list";
export const metadata = {
  title: "Wish List - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function WishList({
  searchParams
}) {
  const {
    products,
    totalProducts
  } = await getWishListProducts(searchParams.page);
  return <WishListPageView products={products} totalProducts={totalProducts} />;
}