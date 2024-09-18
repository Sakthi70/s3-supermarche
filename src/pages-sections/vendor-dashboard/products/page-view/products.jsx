"use client";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; 
// GLOBAL CUSTOM COMPONENTS

import Scrollbar from "components/scrollbar";
import { TableHeader, TablePagination } from "components/data-table"; 
// GLOBAL CUSTOM HOOK

import useMuiTable from "hooks/useMuiTable"; 
//  LOCAL CUSTOM COMPONENT

import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper"; 
import { getProducts } from "actions/products";
import { calculateDiscountPercentage, t } from "utils/util";
import useApp from "hooks/useApp";
import ProductCard1 from "components/product-cards/product-card-1/product-card";
import { Box, Grid2 } from "@mui/material";
// CUSTOM DATA MODEL


// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "name",
  label: "Name",
  align: "left"
}, {
  id: "category",
  label: "Category",
  align: "left"
},
{
  id: "price",
  label: "Price",
  align: "left"
},
{
  id: "stock",
  label: "Stock",
  align: "left"
},
{
  id: "value",
  label: "Variant",
  align: "left"
},
{
  id: "published",
  label: "Published",
  align: "left"
}, {
  id: "action",
  label: "Action",
  align: "center"
}]; 
// =============================================================================


// =============================================================================
export default function ProductsPageView() {
  const [productList, setProductList] = useState([]); 
  const { content } = useApp();


  const { categories } = content || { categories: [] };


  const [search, setSearch] = useState("");

  const productsListOption = localStorage.getItem('productsListOption') || 'list';
   
  const [view, setview] = useState(productsListOption);

  const getProductsList =async() => {
   await getProducts().then(({products}) => setProductList(products));
  } 

  useEffect(() => {
    getProductsList();
  }, [])
// RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID

  // const filteredProducts = productList.map(item => ({
  //   id: item.id,
  //   slug: item.slug,
  //   name: item.title,
  //   brand: item.brand,
  //   price: item.price,
  //   image: item.thumbnail,
  //   published: item.published,
  //   category: item.categories[0]
  // }));
  const filteredProducts = productList;
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredProducts
  });
  return <PageWrapper title={t("Product List")} isView={true} type={view} toggleView={(val) => {localStorage.setItem('productsListOption', val);setview(val);}}>
      <SearchArea handleSearch={() => {}} buttonText={t("Add Product")} url="/admin/products/create" searchPlaceholder={`${t("Search Product")}...`} />

      {view==='list'? <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={productList.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredProducts.map((product, index) => <ProductRow key={index} product={product} categories={categories} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(productList.length / rowsPerPage)} />
        </Stack>
      </Card> : <Grid2 container >
      {filteredProducts.map(item => 
      <Grid2 size={{lg:12, sm:6, md:4, lg:3}} width={1} p={2} key={item.id}>
            <ProductCard1 isPreview={true} hideRating id={item.id} slug={item.slug} price={item.price} title={item.name} imgUrl={item.images} discount={calculateDiscountPercentage(item.price,item.salePrice)} productData={item} />
          </Grid2>)}</Grid2>}
    </PageWrapper>;
}