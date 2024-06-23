import { notFound } from "next/navigation";
import { AddressDetailsPageView } from "pages-sections/customer-dashboard/address/page-view"; 
// API FUNCTIONS

import api from "utils/__api__/address"; 
// CUSTOM DATA MODEL

export const metadata = {
  title: "Address - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function Address({
  params
}) {
  try {
    const address = await api.getAddress(params.id);
    return <AddressDetailsPageView address={address} />;
  } catch (error) {
    notFound();
  }
}