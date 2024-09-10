"use client";

import { Fragment, useCallback, useState } from "react";
import Divider from "@mui/material/Divider"; 
// GLOBAL CUSTOM COMPONENTS

import Sticky from "components/sticky";
import { SearchInput } from "components/search-box";
import { MobileMenu } from "components/navbar/mobile-menu";
import { Header, HeaderCart, HeaderLogin } from "components/header";
import { MobileHeader, HeaderSearch } from "components/header/mobile-header";
import { Topbar, TopbarLanguageSelector, TopbarSocialLinks } from "components/topbar"; 
import Categories from "components/navbar/categories";
import { Box, useMediaQuery } from "@mui/material";
import useHeader from "components/header/hooks/use-header";
import LoginCartButtons from "components/header/components/login-cart-buttons";
import DialogDrawer from "components/header/components/dialog-drawer";
// CUSTOM DATA MODEL


// ==============================================================
export default function ShopLayout2({
  children,
  navbar,
  data
}) {
  const {
    header,
    topbar,
    mobileNavigation
  } = data;
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  const {dialogOpen,sidenavOpen, toggleDialog, toggleSidenav } = useHeader();
  const DOWN_600 = useMediaQuery(theme => theme.breakpoints.down(786));
  const MOBILE_VERSION_HEADER = <MobileHeader>
      <MobileHeader.Left>
      {DOWN_600 ? <MobileHeader.Logo logoUrl={mobileNavigation.logo} /> : <Categories />}
      </MobileHeader.Left>

      {!DOWN_600 && <MobileHeader.Logo logoUrl={mobileNavigation.logo} />}

      <MobileHeader.Right>
        <HeaderSearch>
          <SearchInput />
        </HeaderSearch>

        {/* {!DOWN_600  && <HeaderLogin />}
        {!DOWN_600  && <HeaderCart /> } */}
        {!DOWN_600 &&
          <LoginCartButtons
          toggleDialog={toggleDialog}
          toggleSidenav={toggleSidenav}
        />
        }
      </MobileHeader.Right>
    </MobileHeader>;
  return <Fragment>
      {
      /* TOP BAR AREA */
    }
      <Topbar label={topbar.label} title={topbar.title}>
        <Topbar.Right>
          <TopbarLanguageSelector languages={topbar.languageOptions} />
          <TopbarSocialLinks links={topbar.socials} />
        </Topbar.Right>
      </Topbar>

      {
      /* HEADER */
    }
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={70}>
        <Header mobileHeader={MOBILE_VERSION_HEADER}>
          <Header.Logo url={header.logo} />


          <Header.Mid>
          <Box pl={2}>
             <Categories />
            </Box>
            <SearchInput />
          </Header.Mid>

          <Header.Right>
          <LoginCartButtons
          toggleDialog={toggleDialog}
          toggleSidenav={toggleSidenav}
        />
          </Header.Right>
        </Header>
      </Sticky>
      <DialogDrawer
        dialogOpen={dialogOpen}
        sidenavOpen={sidenavOpen}
        toggleDialog={toggleDialog}
        toggleSidenav={toggleSidenav}
      />
      {
      /* NAVIGATION BAR */
    }
      {/* {navbar ?? <Divider />} */}

      {
      /* BODY CONTENT */
    }
      {children}
    </Fragment>;
}