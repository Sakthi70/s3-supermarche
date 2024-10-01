"use client";

import { Fragment, useState } from "react";
// MUI

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
// LOCAL CUSTOM COMPONENTS

import CheckboxLabel from "./checkbox-label";
// GLOBAL CUSTOM COMPONENTS

import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/accordion-header";
// TYPE

import { Accordion, AccordionDetails, AccordionSummary, Slider, Typography } from "@mui/material";
import { currency } from "lib";
import { ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/navigation";
// FILTER OPTIONS


const OTHERS = [
  {
    label: "On Sale",
    value: "sale",
  },
  {
    label: "In Stock",
    value: "stock",
  },
  {
    label: "Featured",
    value: "featured",
  },
];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];
// ============================================================================

// ============================================================================
export default function ProductFilterCard({ filters, changeFilters,categoryList,min=0,max=0 }) {


  const handleChangePrice = (values) => {
    changeFilters("price", values);
  };

  const handleChangeSales = (value) => {
    const values = filters.sales.includes(value)
      ? filters.sales.filter((item) => item !== value)
      : [...filters.sales, value];
    changeFilters("sales", values);
  };


  return (
    <div>
      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>
    <RecursiveAccordion data={categoryList} />
      <Box component={Divider} my={3} />

      {/* PRICE VARIANT FILTER */}
      <H6 mb={4}>Price Range</H6>

      <Slider
        min={min}
        max={max}
        size="small"
        value={filters.price}
        valueLabelDisplay="on"
        valueLabelFormat={(v) => `€${v}`}
        onChange={(_, v) => handleChangePrice(v)}
      />
      <FlexBetween>
<Span color="grey.600" >
          {currency(min,2)}
        </Span>
        <H5 color="grey.600" px={1}>
          -
        </H5>
        <Span color="grey.600" >
        {currency(max,2)}
        </Span>
       
      </FlexBetween>

      <Box component={Divider} my={3} />

     
    </div>
  );
}


const RecursiveAccordion = ({ data,pl=0 }) => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  return (
    <>
      {data.map((item, index) =>
        item.child.length > 0 ? (
          <Fragment key={item.name}>
            <AccordionHeader
              open={collapsed}
              onClick={() => setCollapsed((state) => !state)}
              sx={{
                padding: ".5rem 0",
                cursor: "pointer",
                color: "grey.600",
              }}
            >
              <Span sx={{pl:`${pl}px`}} onClick={() => router.push(`/categories/search/${item.id}`)}>{item.name}</Span>
            </AccordionHeader>

            <Collapse in={collapsed}>
             <RecursiveAccordion data={item.child} pl={pl+11}/>
            </Collapse>
          </Fragment>
        ) : (
          <Paragraph
            key={item.name}
            onClick={() => router.push(`/categories/search/${item.id}`)}
            sx={{
              pl:`${pl}px`,
              py: 0.75,
              fontSize: 14,
              cursor: "pointer",
              color: "grey.600",
            }}
          >
            {item.name}
          </Paragraph>
      ))}
    </>
  );
};