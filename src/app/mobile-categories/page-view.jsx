"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
// MUI

import Tooltip from "@mui/material/Tooltip"; 
// GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography";
// import IconComponent from "components/IconComponent";
import OverlayScrollbar from "components/overlay-scrollbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import { HeaderCart, HeaderLogin } from "components/header";
import { MobileMenu } from "components/navbar/mobile-menu";
import {  MobileHeader } from "components/header/mobile-header";
import renderChild from "./render-child"; 
// STYLES
import useApp from "hooks/useApp";
import { buildTree } from "utils/util";
import { CategoryListItem, StyledRoot } from "./styles"; 
import Image from "next/image";
// TYPES


// ==============================================================
export default function MobileCategoriesPageView({
  data
}) {
  const {
    header,
    mobileNavigation
  } = data;
  const router = useRouter();
  const {content }= useApp();
  const {categories}= content || {categories:[]};

 let categoryList = buildTree(categories ?? []);


  const [selected, setSelected] = useState(categoryList[0]);
  return <StyledRoot>
      <div className="header">
        <MobileHeader>
          <MobileHeader.Left>
            <MobileMenu navigation={header.navigation} />
          </MobileHeader.Left>

          <MobileHeader.Logo logoUrl={'/assets/images/S3/s3.png'} />

          <MobileHeader.Right>
            <HeaderLogin />
            <HeaderCart />
          </MobileHeader.Right>
        </MobileHeader>
      </div>

      <OverlayScrollbar className="category-list">
        {categoryList.map((item, i) => <Tooltip key={i} title={item.name} placement="right" arrow>
            <CategoryListItem isActive={selected.name === item.name} onClick={() => {
          if (item.child) setSelected(item);else router.push(`/products/search/${item.slug}`);
        }}>
              {/* <IconComponent icon={item.icon} className="icon" /> */}
              {item.image && <Image src={item.image} width={30} height={30} />}
              <Paragraph className="title">{item.name}</Paragraph>
            </CategoryListItem>
          </Tooltip>)}
      </OverlayScrollbar>

      <div className="container">{renderChild(selected.child)}</div>

      <MobileNavigationBar navigation={mobileNavigation.version1} />
    </StyledRoot>;
}