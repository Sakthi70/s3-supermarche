"use client";
// GLOBAL CUSTOM COMPONENTS
import Scrollbar from "components/scrollbar";
import { NavLink } from "components/nav-link"; 
// LOCAL CUSTOM COMPONENTS

import ListItem from "./components/list-item";
import NavAccordion from "./components/nav-accordion"; 
// STYLED COMPONENTS

import { StyledCard } from "./styles"; 
import useApp from "hooks/useApp";
import { buildTree } from "utils/util";
// CUSTOM DATA MODEL


// ===========================================================
export default function GrocerySideNav({
  navigation
}) {
  
  const {content }= useApp();
  const {categories}= content || {categories:[]};

 let categoryList = buildTree(categories ?? []);


  return <Scrollbar>
      <StyledCard elevation={3}>
        {categoryList.map((item, ind) => {
        if (item.child.length > 0) return <NavAccordion item={item} key={ind} />;
        return <NavLink key={ind} href={`/categories/search/${item.id}`} color="grey.700">
              <ListItem title={item.name} icon={item.image} />
            </NavLink>;
      })}
      </StyledCard>
    </Scrollbar>;
}