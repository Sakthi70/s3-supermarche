import { ProductCreatePageView } from "pages-sections/vendor-dashboard/products/page-view";
export const metadata = {
  title: "Product Create - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function ProductCreate() {
  return <ProductCreatePageView />;
}