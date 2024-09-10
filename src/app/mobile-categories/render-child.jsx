import Link from "next/link"; 
// LOCAL CUSTOM COMPONENTS

import NavAccordion from "./nav-accordion"; 
// CUSTOM DATA MODEL

export default function renderChild(categories) {
  return categories.map((item, i) => {
    if (item.child) return <NavAccordion item={item} key={i} />;
    return <Link href={`/products/search/${item.slug}`} key={i} className="link">
        {item.name}
      </Link>;
  });
}