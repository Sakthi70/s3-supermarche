import { CheckoutPageView } from "pages-sections/checkout/page-view";
export const metadata = {
  title: "Checkout - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Checkout() {
  return <CheckoutPageView />;
}