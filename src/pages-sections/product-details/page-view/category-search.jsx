"use client";

import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
// MUI ICON COMPONENTS

import Apps from "@mui/icons-material/Apps";
import ViewList from "@mui/icons-material/ViewList";
import FilterList from "@mui/icons-material/FilterList";
// Local CUSTOM COMPONENT

import ProductFilterCard from "../product-filter-card";
// GLOBAL CUSTOM COMPONENTS

import Sidenav from "components/side-nav";
import { H5, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductsGridView from "components/products-view/products-grid-view";
import ProductsListView from "components/products-view/products-list-view";
// PRODUCT DATA

import productDatabase from "data/product-database";
import { useParams } from "next/navigation";
import {  buildTreebyId, getAllCategoriesByOption, getMinMaxPrice } from "utils/util";
import useApp from "hooks/useApp";
import { productsCategorySearch } from "actions/products";
// TYPE

const SORT_OPTIONS = [
  {
    label: "Relevance",
    value: "relevance",
  },
  {
    label: "Price Low to High",
    value: "asc",
  },
  {
    label: "Price High to Low",
    value: "desc",
  },
];
const initialFilters = {
  sales: [],
  price: [0, 0],
};
export default function CategorySearchPageView() {
  const {slug} =useParams();
  const {content }= useApp();
  const {categories}= content || {categories:[]};
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({ ...initialFilters });
  const [productData, setproductData] = useState([]);
  const [categoryList, setcategoryList] = useState([])
  // const featuredProducts = await api.getFeaturedProducts();
  // const bestHomeProducts = await api.getBestHomeProducts();

 
  

  useEffect(() => {
    if(slug){
        getproductsByCategory();
    }
  }, [slug])

  const getproductsByCategory =async()=>{
;          let categor = getAllCategoriesByOption(categories ?? [], slug);
            let prods = await productsCategorySearch(categor);
            let filterCategory = prods.map(x => x.categoryId).reduce((acc, value) => {
              if (!acc.includes(value)) {
                acc.push(value);
              }
              return acc;
            }, []);

            let cateList = categories.filter(x => filterCategory.includes( x.id));
            setcategoryList( buildTreebyId(cateList,filterCategory))

            setproductData(prods.map((x,i) => {return {...x,relevance:i}}));
  }




  
  
  

  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleChangeFilters = (key, values) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const handleChangeSortBy = useCallback((v) => setSortBy(v), []);
  const toggleView = useCallback((v) => () => setView(v), []);
  const PRODUCTS =  productData.filter(x => (x.salePrice || x.price) >=filters.price[0] && (x.salePrice || x.price) <=filters.price[1]).sort((a, b) => {
    if(sortBy === 'relevance'){
      return b.relevance - a.relevance;
    }
    else if (sortBy === 'desc') {
      return (b.salePrice || b.price ) - (a.salePrice || a.price );
    }
      return (a.salePrice || a.price ) - (b.salePrice || b.price );
  });

  

  const {min,max} =  getMinMaxPrice(productData);

  useEffect(() => {
    handleChangeFilters('price',[min,max])
  }, [min,max])
  // const PRODUCTS = [...(bestHomeProducts ?? []),...(featuredProducts??[])];
  return (
    <div className="bg-white pt-2 pb-4">
      <Container>
        {/* FILTER ACTION AREA */}
        <FlexBetween flexWrap="wrap" gap={2} mb={2}>
          <div>
            {/* <H5 lineHeight={1} mb={1}>
              Searching for “ tomato ”
            </H5>
            <Paragraph color="grey.600">48 results found</Paragraph> */}
          </div>

          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap">
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Sort by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                value={sortBy}
                variant="outlined"
                placeholder="Sort by"
                onChange={(e) => handleChangeSortBy(e.target.value)}
                sx={{
                  flex: "1 1 0",
                  minWidth: "150px",
                }}
              >
                {SORT_OPTIONS.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  fontSize="small"
                  color={view === "grid" ? "primary" : "inherit"}
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  fontSize="small"
                  color={view === "list" ? "primary" : "inherit"}
                />
              </IconButton>

              {/* SHOW IN THE SMALL DEVICE */}
              {downMd && (
                <Sidenav
                  handler={(close) => (
                    <IconButton onClick={close}>
                      <FilterList fontSize="small" />
                    </IconButton>
                  )}
                >
                  <Box px={3} py={2}>
                    <ProductFilterCard
                    min={min}
                    max={max}
                      filters={filters}
                      changeFilters={handleChangeFilters}
                      categoryList={categoryList}
                    />
                  </Box>
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </FlexBetween>

        <Grid container spacing={4}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          <Grid
            item
            xl={2}
            md={3}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard
              filters={filters}
              changeFilters={handleChangeFilters}
              categoryList={categoryList}
              min={min}
              max={max}
            />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid item xl={10} md={9} xs={12}>
            {view === "grid" ? (
              <ProductsGridView products={PRODUCTS} />
            ) : (
              <ProductsListView products={PRODUCTS} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
