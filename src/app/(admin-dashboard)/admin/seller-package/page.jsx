import { SellerPackagePageView } from "pages-sections/vendor-dashboard/seller-package/page-view";
export const metadata = {
  title: "Seller Package - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function SellerPackage() {
  return <SellerPackagePageView />;
}