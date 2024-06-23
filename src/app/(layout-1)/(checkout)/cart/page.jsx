import { CartPageView } from "pages-sections/cart/page-view";
export const metadata = {
  title: "Cart - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function Cart() {
  return <CartPageView />;
}