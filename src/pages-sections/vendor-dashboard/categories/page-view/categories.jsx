"use client";

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
// LOCAL CUSTOM COMPONENT

import CategoryRow from "../category-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import useApp from "hooks/useApp";
import { useState } from "react";
import BulkUploadCategory from "../bulk-upload-cateory";
import { t } from "utils/util";
import { useParams } from "next/navigation";
import { Box, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
import CategoryGrid from "../category-grid";
// =============================================================================

// =============================================================================
const CategoriesPageView = ({}) => {
  
   const {content }= useApp();
   const params = useParams();
   const slug = params.slug;
   const {categories}= content || {categories:[]};

   const [search, setSearch] = useState("");

   const categoryListOption = localStorage.getItem('categoryListOption') || 'list';
   
   const [open, setopen] = useState(false)
   const [view, setview] = useState(categoryListOption);


   const parent = categories.find( x => x.id === slug )
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = categories.filter( x => (slug ? x.parentId === slug : true) && (x.name.includes(search) || x.slug.includes(search)));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredCategories,
    rowsPerPage:5
  });
  return (
    <PageWrapper isView={true} type={view} toggleView={(val) => {localStorage.setItem('categoryListOption', val);setview(val);}} title={parent? `${t("Categories Under")} ${parent.name}` : t("Product Categories")}>
      <SearchArea
        handleSearch={(val) => setSearch(val.target.value)}
        buttonText={t("Add Category")}
        url={slug ?`/admin/categories/${slug}/create` : "/admin/categories/create"}
        searchPlaceholder={`${t("Search Category")}...`}
        isBulk={true}
        bulkText={t("Bulk Upload")}
        handleBulk={() => setopen(true)}
      />
      <BulkUploadCategory open={open}  handleClose={() => setopen(false)}/>
      <Card>
        <Scrollbar>
         {view === 'list' ? <><TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={categories.filter( x => (slug ? x.parentId === slug : true)).length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
              {filteredList.map((category) => (
                  <CategoryRow
                  slugId={slug}
                    key={category.id}
                    category={category}
                    selected={selected}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(categories.filter( x => (slug ? x.parentId === slug : true)).length / rowsPerPage)}
          />
        </Stack>
        </>: <Grid container >
            {categories.filter( x => (slug ? x.parentId === slug : x.parentId == null)).map((category) => 
            <Grid item xs={6} sm={4} md={3} lg={2} p={2}  key={category.id} >
              <CategoryGrid  slugId={slug}
                    key={category.id}
                    category={category}
                    selected={selected}/>
                    </Grid>
                )}
            </Grid>}
        </Scrollbar>

       
      </Card>
    </PageWrapper>
  );
};

export default CategoriesPageView;
