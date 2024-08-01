import { EditCategoryPageView } from "pages-sections/vendor-dashboard/categories/page-view";
export const metadata = {
  title: "Edit Category - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function EditCategory() {
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want

  return <EditCategoryPageView />;
}