"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react"; 
// MUI ICON COMPONENTS

import Place from "@mui/icons-material/Place";
import Person from "@mui/icons-material/Person";
import CreditCard from "@mui/icons-material/CreditCard";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined"; 
// GLOBAL CUSTOM COMPONENTS

import FlexBox from "components/flex-box/flex-box";
import { Paragraph, Span } from "components/Typography"; 
// CUSTOM ICON COMPONENT

import CustomerService from "icons/CustomerService"; 
// STYLED COMPONENTS

import { MainContainer, StyledNavLink } from "./styles";
export default function Navigation() {
  const pathname = usePathname();
  return <MainContainer>
      {MENUS.map(item => <Fragment key={item.title}>
          <Paragraph p="26px 30px 1rem" color="grey.600" fontSize={12}>
            {item.title}
          </Paragraph>

          {item.list.map(({
        Icon,
        count,
        href,
        title
      }) => <StyledNavLink href={href} key={title} isCurrentPath={pathname.includes(href)}>
              <FlexBox alignItems="center" gap={1}>
                <Icon color="inherit" fontSize="small" className="nav-icon" />
                <Span>{title}</Span>
              </FlexBox>

              <Span>{count}</Span>
            </StyledNavLink>)}
        </Fragment>)}
    </MainContainer>;
}
const MENUS = [{
  title: "DASHBOARD",
  list: [
    {
      href: "/profile",
      title: "Profile Info",
      Icon: Person,
      // count: 3
    },
    {
    href: "/orders",
    title: "Orders",
    Icon: ShoppingBagOutlined,
    // count: 5
  }, 
]
}];