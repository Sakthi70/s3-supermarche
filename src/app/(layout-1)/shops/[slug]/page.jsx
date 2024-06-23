import { notFound } from "next/navigation"; 
// API FUNCTIONS

import api from "utils/__api__/shop"; 
// PAGE VIEW COMPONENT

import { ShopDetailsPageView } from "pages-sections/shops/page-view";
export const metadata = {
  title: "Shop Details - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function ShopDetails({
  params
}) {
  try {
    const shop = await api.getProductsBySlug(String(params.slug));
    return <ShopDetailsPageView shop={shop} />;
  } catch (error) {
    notFound();
  }
}