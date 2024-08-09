import EditBannerPageView from "pages-sections/vendor-dashboard/banners/page-view/banner-edit";

export const metadata = {
  title: "Edit Banner - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function EditBanner() {
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want

  return <EditBannerPageView />;
}