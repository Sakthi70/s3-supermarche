import ShopLayout1 from "components/layouts/shop-layout-1";
import { LAYOUT_DATA } from "utils/constants";
export default function Layout1({
  children
}) {
  const data = LAYOUT_DATA; 
  // NAVIGATION MENU LIST
  
    return <ShopLayout1 data={data} >{children}</ShopLayout1>;
}