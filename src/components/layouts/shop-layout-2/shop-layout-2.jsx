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
import { Box, IconButton, useMediaQuery } from "@mui/material";
import useHeader from "components/header/hooks/use-header";
import LoginCartButtons from "components/header/components/login-cart-buttons";
import DialogDrawer from "components/header/components/dialog-drawer";
import { Footer2 } from "components/footer";
import Newsletter from "components/newsletter/newsletter";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import Scrollbar from "components/scrollbar/scrollbar";
import { Logout } from "@mui/icons-material";
import { logout } from "actions/auth";
import { useSession } from "next-auth/react";
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
  const{data:session ,status}= useSession();
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
        {DOWN_600  && status === 'authenticated' && <IconButton onClick={async() =>  await logout()}>
          <Logout sx={{color:'grey.600'}} />
        </IconButton> }
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
      
    {!DOWN_600 &&  <Footer2 />}

      <Newsletter image="/assets/images/newsletter/bg-2.png" />
      {DOWN_600 && <MobileNavigationBar2>
        {/* <Scrollbar>{SideNav}</Scrollbar> */}
      </MobileNavigationBar2>}
    </Fragment>;
}