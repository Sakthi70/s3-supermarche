"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation"; 
import Collapse from "@mui/material/Collapse"; 
// GLOBAL CUSTOM COMPONENTS

import { Paragraph } from "components/Typography";
// LOCAL CUSTOM COMPONENTS
import {AccordionHeader} from "components/accordion"; 
import renderChild from "./render-child"; 
// CUSTOM DATA MODEL


// ==============================================================
export default function NavAccordion({
  item: {
    name,
    slug,
    child
  }
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return <Fragment>
      <AccordionHeader  onDoubleClick={(e) =>  {e.preventDefault(); router.push(`/products/search/${slug}`)}} onClick={() => setOpen(state => !state)} sx={{
      paddingInline: 0,
      paddingBlock: 0.5,
      cursor: "pointer",
      ".caret": {
        transform: open ? "rotate(90deg)" : "rotate(0deg)"
      }
    }}>
        <Paragraph fontWeight="600">{name}</Paragraph>
      </AccordionHeader>

      {
      /* RENDER NESTED ITEMS */
    }
      {child ? <Collapse in={open}>
          <div className="child-categories">{renderChild(child)}</div>
        </Collapse> : null}
    </Fragment>;
}