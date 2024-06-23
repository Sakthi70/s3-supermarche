import { SupportTicketsPageView } from "pages-sections/vendor-dashboard/support-tickets/page-view"; 
// API FUNCTIONS

import api from "utils/__api__/ticket";
export const metadata = {
  title: "Support Tickets - S3 Supermarche",
  description: `S3 Supermarche E-commerce is a friendly Online store`,
  authors: [{
    name: "RAJASEKAR",
    url: "Geeo Technologies"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function SupportTickets() {
  const tickets = await api.getTicketList();
  return <SupportTicketsPageView tickets={tickets} />;
}