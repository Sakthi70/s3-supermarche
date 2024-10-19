import { OrderConfirmationPageView } from "pages-sections/order-confirmation";

export const metadata = {
  title: "Checkout Alternative - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function OrderConfirmation() {
  return <OrderConfirmationPageView />;
}