import { CategoriesPageView } from "pages-sections/vendor-dashboard/categories/page-view"; 
// API FUNCTIONS

import api from "utils/__api__/dashboard";
export const metadata = {
  title: "Categories - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Categories() {
  const categories = await api.category();
  return <CategoriesPageView categories={categories} />;
}