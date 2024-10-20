import duotone from "icons/duotone";
import { t } from "utils/util";
export const navigation = [{
  type: "label",
  label: t("Admin")
},
 {
  name: t("Dashboard"),
  icon: duotone.Dashboard,
  path: "/vendor/dashboard"
}, 
{
  name: t("Banners"),
  icon: duotone.ProjectChart,
    path: "/admin/banners"
},
 {
  name: t("Categories"),
  icon: duotone.Accounts,
    path: "/admin/categories"
 
},
{
  name: "Pages",
  icon: duotone.Apps,
  path: "/admin/pages"
}, 
{
  name: t("Products"),
  icon: duotone.Products,
    path: "/admin/products"
},

//  {
//   name: "Brands",
//   icon: duotone.Apps,
//   children: [{
//     name: "Brand List",
//     path: "/admin/brands"
//   }, {
//     name: "Create Brand",
//     path: "/admin/brands/create"
//   }]
// },
 {
  name: "Orders",
  icon: duotone.Order,
  children: [{
    name: "Order List",
    path: "/admin/orders"
  }, 
  // {
  //   name: "Order Details",
  //   path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
  // }
]
}, 
{
  name: "Customers",
  icon: duotone.Customers,
  path: "/admin/customers"
}, 

// {
//   name: "Refunds",
//   icon: duotone.Refund,
//   children: [{
//     name: "Refund Request",
//     path: "/admin/refund-request"
//   }, {
//     name: "Refund Settings",
//     path: "/admin/refund-setting"
//   }]
// }, 
// {
//   name: "Sellers",
//   icon: duotone.Seller,
//   children: [{
//     name: "Seller List",
//     path: "/admin/sellers"
//   }, {
//     name: "Seller Package",
//     path: "/admin/seller-package"
//   }, {
//     name: "Package Payments",
//     path: "/admin/package-payments"
//   }, {
//     name: "Earning History",
//     path: "/admin/earning-history"
//   }, {
//     name: "Payouts",
//     path: "/admin/payouts"
//   }, {
//     name: "Payout Request",
//     path: "/admin/payout-requests"
//   }]
// },
//  {
//   type: "label",
//   label: "Vendor"
// }, 
// {
//   name: "Earnings",
//   icon: duotone.ProjectChart,
//   children: [{
//     name: "Earning History",
//     path: "/vendor/earning-history"
//   }, {
//     name: "Payouts",
//     path: "/vendor/payouts"
//   }, {
//     name: "Payout Request",
//     path: "/vendor/payout-requests"
//   }, {
//     name: "Payout Settings",
//     path: "/vendor/payout-settings"
//   }]
// }, 
// {
//   name: "Refund Request",
//   icon: duotone.Refund,
//   path: "/vendor/refund-request"
// }, 
// {
//   name: "Reviews",
//   icon: duotone.Review,
//   path: "/vendor/reviews"
// }, 
// {
//   name: "Shop Setting",
//   icon: duotone.SiteSetting,
//   path: "/vendor/shop-settings"
// },
//  {
//   name: "Support Tickets",
//   icon: duotone.ElementHub,
//   path: "/vendor/support-tickets"
// }, 
{
  name: "Site Settings",
  icon: duotone.SiteSetting,
  path: "/vendor/site-settings"
}, {
  name: "Logout",
  icon: duotone.Session,
  path: "/"
}];