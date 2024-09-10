import * as db from './data';

export const layoutConstant = {
  topbarHeight: 40,
  headerHeight: 80,
  mobileNavHeight: 64,
  containerWidth: 1200,
  mobileHeaderHeight: 64,
  grocerySidenavWidth: 280
};

export const appContent = {
  appName: "S3 Supermarche",
  appShort : "S3"
}

export const NO_IMAGE_FOR_PRODUCT = "/assets/images/products/noImageFound.png";

// export const SERVICE_LIST = [{
//   id: "a363c53d-9d1e-41c9-9ba3-4001a1832215",
//   icon: "Truck",
//   title: "Fast Delivery",
//   description: "Start from €10"
// }, {
//   id: "828a0143-5368-4c0f-bbbb-00e0ebd12b9b",
//   icon: "FeedbackThumbsUp",
//   title: "Feedback",
//   description: "97% positive"
// }, {
//   id: "13cc2e20-acd8-481d-8e23-91090ef17109",
//   icon: "Shield",
//   title: "Payment",
//   description: "100% secured"
// }]; 

export const SERVICE_LIST = [
  
  {
  id: "b774ce8e-439e-44be-9516-129e0ad8be18",
  icon: "Truck",
  title: "Fast Delivery",
  description: "Start from €10"
}, {
  id: "828a0143-5368-4c0f-bbbb-00e0ebd12b9b",
  icon: "FeedbackThumbsUp",
  title: "Feedback",
  description: "97% positive"
},
{
  id: "16265099-6150-4b44-80e5-1790383ada5f",
  icon: "Payment",
  title: "Payment",
  description: "Secure system"
}, {
  id: "347e809a-a479-4895-9344-5660aeb00638",
  icon: "OnlineSupport",
  title: "Online Support",
  description: "Customer Support"
}]; 

export const LAYOUT_DATA = {
  footer: {
    appStoreUrl: "#",
    playStoreUrl: "#",
    logo: "/assets/images/S3/s3-logo.png",
    contact: db.footerContact,
    about: db.footerAboutLinks,
    socials: db.footerSocialLinks,
    description: db.footerDescription,
    customers: db.footerCustomerCareLinks
  },
  mobileNavigation: {
    version1: db.mobileNavigation,
    version2: db.mobileNavigationTwo,
    logo: "/assets/images/S3/s3.png"
  },
  topbar: {
    label: "HOT",
    title: "Free Express Shipping",
    socials: db.topbarSocialLinks,
    languageOptions: db.languageOptions
  },
  header: {
    categories: db.categories,
    categoryMenus: db.categoryMenus,
    navigation: db.navbarNavigation,
    logo: "/assets/images/S3/s3-logo.png"
  }
};