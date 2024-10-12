"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import styled from "@mui/material/styles/styled"; 
// Local CUSTOM COMPONENTS

import FooterForm from "../footer-form";
import GeneralForm from "../general-form";
import BannerSlider from "../banner-slider";
import ShippingVatForm from "../shipping-vat-form";
import SocialLinksForm from "../social-links-form"; 
import { useRouter } from "next/navigation";
import { getSettings, updateSettings } from "actions/settings";
import { PageLoader } from "pages-sections/vendor-dashboard/categories/page-view/create-category";
import useApp from "hooks/useApp";
import CityForm from "../city-form";
import LinkForm from "../link-form";
// STYLED COMPONENTS

const StyledTabPanel = styled(TabPanel)({
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0
});
const StyledTabList = styled(TabList)(({
  theme
}) => ({
  "& .MuiTab-root.Mui-selected": {
    color: theme.palette.info.main
  },
  "& .MuiTabs-indicator": {
    background: theme.palette.info.main
  }
}));

const SiteSettingsPageView = () => {


  const [settings, setSettings] = useState();
  const {loading} =useApp();


  useEffect(() => {
    getSetting();
  }, [])

  const getSetting =async()=>{
      await getSettings().then((settings) => setSettings(settings))
  }
  const saveSettings = async(data) => {
      loading(true);
      await updateSettings({...data, id: settings.id}).then(async() => await getSetting()).finally(() => loading(false));

  }
  

  const [selectTab, setSelectTab] = useState("footer");

  if(!settings){
    return <PageLoader />
  }

  return <Box py={4}>
      <Card sx={{
      px: 3,
      py: 2
    }}>

      
        <TabContext value={selectTab}>
          <Box sx={{
          borderBottom: 1,
          borderColor: "grey.300"
        }}>
            <StyledTabList onChange={(_, value) => setSelectTab(value)} variant="scrollable">
              <Tab label="Footer" value="footer" disableRipple />
              <Tab label="Footer Links" value="links" disableRipple />
              <Tab label="Social Links" value="social-links" disableRipple />
              {/* <Tab label="Banner Slider" value="banner-slider" disableRipple /> */}
              <Tab label="Shipping & Vat" value="shipping-vat" disableRipple />
              <Tab label="Supported Cities" value="city" disableRipple />
            </StyledTabList>
          </Box>

          {/* <StyledTabPanel value="general">
            <GeneralForm />
          </StyledTabPanel> */}

          <StyledTabPanel value="city">
            <CityForm cities={settings.cities ?? []} onSave={saveSettings} />
          </StyledTabPanel>

          <StyledTabPanel value="footer">
            <FooterForm  settings={settings} onSave={saveSettings}/>
          </StyledTabPanel>

          <StyledTabPanel value="links">
            {selectTab === 'links' && <LinkForm />}
          </StyledTabPanel>
          <StyledTabPanel value="social-links" >
            <SocialLinksForm  values={settings} onSave={saveSettings}/>
          </StyledTabPanel>

          {/* <StyledTabPanel value="banner-slider">
            <BannerSlider />
          </StyledTabPanel> */}

          <StyledTabPanel value="shipping-vat">
            <ShippingVatForm  values={{vat: settings.vat,
    shipping: settings.shipping}} onSave={saveSettings}/>
          </StyledTabPanel>
        </TabContext>
      </Card>
    </Box>;
};

export default SiteSettingsPageView;