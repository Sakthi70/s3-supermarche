import { RefundSettingPageView } from "pages-sections/vendor-dashboard/refund-setting/page-view";
export const metadata = {
  title: "Refund Setting - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function RefundSetting() {
  return <RefundSettingPageView />;
}