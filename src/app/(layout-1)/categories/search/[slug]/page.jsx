
// PAGE VIEW COMPONENT
import { CategorySearchPageView } from "pages-sections/product-details/page-view";
export const metadata = {
  title: "Category Search - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default  function CategorySearch({
  params
}) {

  return <CategorySearchPageView />;
}