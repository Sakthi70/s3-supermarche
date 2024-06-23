import { GroceryTwoPageView } from "pages-sections/grocery-2/page-view";
export const metadata = {
  title: "Grocery 2 - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function GroceryTwo() {
  return <GroceryTwoPageView />;
}