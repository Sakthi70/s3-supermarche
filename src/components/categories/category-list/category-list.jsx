
// LOCAL CUSTOM COMPONENTS
import MegaMenu1 from "../mega-menu/mega-menu-1";
import MegaMenu2 from "../mega-menu/mega-menu-2";
import CategoryListItem from "../category-list-item"; 
// NAVIGATION DATA

import { categoryMenus } from "data/navigations"; 
// STYLED COMPONENT

import { StyledRoot } from "./styles"; 
import useApp from "hooks/useApp";
import { buildTree } from "utils/util";
// PROPS TYPE

export default function CategoryList({
  open,
  position = "absolute"
}) {
  const {content }= useApp();
  const {categories}= content || {categories:[]};


 let categoryList = buildTree(categories ?? []);
  return <StyledRoot open={open} position={position}>
      {categoryList && categoryList.map(item => {
      const {
        id,
        slug,
        name,
        child,
        image,
      } = item;
      const MegaMenu =  MegaMenu1;
      return <CategoryListItem key={name} href={`/categories/search/${id}`} icon={image} title={name} caret={child.length >0} render={child.length >0 ? <MegaMenu data={child} banner={null} /> : null} />;
    })}
    </StyledRoot>;
}