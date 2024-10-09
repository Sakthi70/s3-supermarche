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
import { useParams, useRouter } from "next/navigation";
import { Box, Fab, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import { Paragraph } from "components/Typography";
import { FlexBox } from "components/flex-box";
import CategoryGrid from "../category-grid";
import { createMultipleCategory } from "actions/categories";
import { AccountTree, Category, ChromeReaderMode } from "@mui/icons-material";
import BulkUploadProduct from "../bulk-upload-product";
import { createMultipleProducts } from "actions/products";
// =============================================================================

// =============================================================================
const CategoriesPageView = ({}) => {
  const { content, categories: catCrud } = useApp();
  const params = useParams();
  const slug = params.slug;
  const { categories } = content || { categories: [] };
  const router = useRouter();
  const [search, setSearch] = useState("");

  const categoryListOption =
    localStorage.getItem("categoryListOption") || "list";

  const [open, setopen] = useState(false);
  const [openProduct, setopenProduct] = useState(false);
  const [view, setview] = useState(categoryListOption);

  const parent = categories.find((x) => x.id === slug);
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = categories.filter(
    (x) =>
      (slug ? x.parentId === slug : true) &&
      (x.name.includes(search) || x.slug.includes(search))
  );
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
    rowsPerPage: 5,
  });

  const uploadMultipleCategory = async (arr) => {
    let bulkArr = [
      ...new Map(arr.map((item) => [item["name"], item])).values(),
    ].filter(
      (y) =>
        !categories
          .filter((x) => x.parentId === slug)
          .some(
            (x) => x.name.trim().toLowerCase() === y.name.trim().toLowerCase()
          )
    );
    await createMultipleCategory(
      bulkArr.map((x) => {
        return {
          ...x,
          parentId: slug == "" ? null : slug,
          slug: parent ? parent.slug + "/" + x.name.trim() : "/" + x.name.trim(),
        };
      })
    ).then(async (values) => {
      await catCrud.createCategory(values);
    });
    setopen(false);
  };

  const uploadMultipleProducts = async (arr) => {
    let genProducts = arr.map((x) => {
      let isBrand = !x.isBrand || x.isBrand == "" ? false : x.isBrand;
      return {
        ...x,
        isBrand: isBrand,
        brandName: isBrand ? x.brandName : "",
        brandImage: !isBrand ? null : x.brandImage,
        tags:
          !x.tags || x.tags == "" ? [] : x.tags.split(",").map((x) => x.trim()),
        images:
          !x.images || x.images == ""
            ? []
            : x.images.split("||").map((x) => x.trim()),
        type: !x.type || x.type == "" ? "Other" : x.type,
        categoryId: slug,
        price: parseFloat(x.price ?? 0),
        salePrice:
          !x.salePrice || x.salePrice === "" ? null : parseFloat(x.salePrice),
        stock: parseInt(x.stock ?? 0),
        limit: !x.limit || x.limit === "" ? null : parseInt(x.limit ?? 0),
      };
    });
    await createMultipleProducts(genProducts).then(() => {
      router.push("/admin/products");
    });
    setopenProduct(false);
  };

  const uploadComps = () => {
    return (
      <>
        {slug && (
          <IconButton color="primary" onClick={() => setopenProduct(true)}>
            <ChromeReaderMode />
          </IconButton>
        )}
        <IconButton color="primary" onClick={() => setopen(true)}>
          <AccountTree />
        </IconButton>
      </>
    );
  };

  return (
    <PageWrapper
      isView={true}
      type={view}
      toggleView={(val) => {
        localStorage.setItem("categoryListOption", val);
        setview(val);
      }}
      title={
        parent
          ? `${t("Categories Under")} ${parent.name}`
          : t("Product Categories")
      }
    >
      <SearchArea
        handleSearch={(val) => setSearch(val.target.value)}
        buttonText={t("Add Category")}
        isAdditional={true}
        comps={uploadComps}
        url={
          slug ? `/admin/categories/${slug}/create` : "/admin/categories/create"
        }
        searchPlaceholder={`${t("Search Category")}...`}
      />
      <BulkUploadCategory
        open={open}
        uploadCategory={uploadMultipleCategory}
        handleClose={() => setopen(false)}
      />
      <BulkUploadProduct
        open={openProduct}
        uploadProduct={uploadMultipleProducts}
        handleClose={() => setopenProduct(false)}
      />
      <Card>
        <Scrollbar>
          {view === "list" ? (
            <>
              <TableContainer
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
                    rowCount={
                      categories.filter((x) =>
                        slug ? x.parentId === slug : true
                      ).length
                    }
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
                  count={Math.ceil(
                    categories.filter((x) =>
                      slug ? x.parentId === slug : true
                    ).length / rowsPerPage
                  )}
                />
              </Stack>
            </>
          ) : (
            <Grid container>
              {categories
                .filter((x) =>
                  slug ? x.parentId === slug : x.parentId == null
                )
                .map((category) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    p={2}
                    key={category.id}
                  >
                    <CategoryGrid
                      slugId={slug}
                      key={category.id}
                      category={category}
                      selected={selected}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Scrollbar>
      </Card>
    </PageWrapper>
  );
};

export default CategoriesPageView;
