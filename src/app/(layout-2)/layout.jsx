import ShopLayout2 from "components/layouts/shop-layout-2";
import { Navbar, NavigationList } from "components/navbar";
import { LAYOUT_DATA } from "utils/constants";
// API FUNCTIONS

export default function Layout({
  children
}) {
  const data = LAYOUT_DATA; 
// NAVIGATION MENU LIST

  const NAVIGATION = <Navbar elevation={0} navigation={<NavigationList navigation={data.header.navigation} />} categories={null} />;
  return <ShopLayout2 data={data} navbar={NAVIGATION}>
      {children}
    </ShopLayout2>;
}