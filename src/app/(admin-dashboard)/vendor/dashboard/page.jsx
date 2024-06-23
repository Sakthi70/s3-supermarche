import { DashboardPageView } from "pages-sections/vendor-dashboard/dashboard/page-view";
export const metadata = {
  title: "Vendor Dashboard - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function VendorDashboard() {
  return <DashboardPageView />;
}