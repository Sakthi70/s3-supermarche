import { PaymentPageView } from "pages-sections/payment/page-view";
export const metadata = {
  title: "Payment - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Payment() {
  return <PaymentPageView />;
}