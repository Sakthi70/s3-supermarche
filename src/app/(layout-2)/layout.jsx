import ShopLayout2 from "components/layouts/shop-layout-2";
import { LAYOUT_DATA } from "utils/constants";
// API FUNCTIONS

export default function Layout({
  children
}) {
  const data = LAYOUT_DATA; 
// NAVIGATION MENU LIST

  return <ShopLayout2 data={data} >
      {children}
    </ShopLayout2>;
}