import { CreateBrandPageView } from "pages-sections/vendor-dashboard/brands/page-view";
export const metadata = {
  title: "Brand Create - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function BrandCreate() {
  return <CreateBrandPageView />;
}