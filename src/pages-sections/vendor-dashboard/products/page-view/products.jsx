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
//  {
//   id: "brand",
//   label: "Brand",
//   align: "left"
// }, 
{
  id: "price",
  label: "Price",
  align: "left"
}, {
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

  const [search, setSearch] = useState("");

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
  return <PageWrapper title="Product List">
      <SearchArea handleSearch={() => {}} buttonText="Add Product" url="/admin/products/create" searchPlaceholder="Search Product..." />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={productList.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((product, index) => <ProductRow key={index} product={product} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(productList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </PageWrapper>;
}