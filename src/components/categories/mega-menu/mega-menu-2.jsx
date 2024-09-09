
// LOCAL CUSTOM COMPONENTS
import OfferBanner from "./banner";
import ColumnList from "./column-list";
import CategoryMenuItem from "../category-list-item"; 
// STYLED COMPONENT

import { StyledRoot } from "./styles"; 
// DATA TYPE


// =======================================================================
export default function MegaMenu2({
  data
}) {
  return <StyledRoot elevation={2}>
      {data.map(item => <CategoryMenuItem href={`/products/search${item.slug}`} icon={item.image} key={item.name} title={item.name} caret={!!item.child} render={item.child?.length ? <ColumnList minWidth={550} list={item.child}>
                {/* <OfferBanner /> */}
              </ColumnList> : null} />)}
    </StyledRoot>;
}