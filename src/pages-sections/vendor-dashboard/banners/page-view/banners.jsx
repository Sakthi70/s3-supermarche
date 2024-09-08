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

import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useEffect, useState } from "react";
import { getBanners } from "actions/banner";
import BannerRow from "../banner-row";
import { useTranslation } from "react-i18next";
// =============================================================================

// =============================================================================
const BannersPageView = ({}) => {
  
  const { t } = useTranslation();
   const [banners, setBanners] = useState([]);

   const [search, setSearch] = useState("");

   const getBannerList =async() => {
    await getBanners(null,false).then(({banners}) => setBanners(banners));
   } 

   useEffect(() => {
     getBannerList();
   }, [])
   
   

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredBanners = banners.filter( x => x.title.includes(search) || x.description.includes(search));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredBanners,
    rowsPerPage:5
  });
  return (
    <PageWrapper title={t("Banners")}>
      <SearchArea
        handleSearch={(val) => setSearch(val.target.value)}
        buttonText={t("Add Banner")}
        url="/admin/banners/create"
        searchPlaceholder={`${t("Search Banner")}...`}
      />

      <Card>
        <Scrollbar>
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
                rowCount={banners.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((banner) => (
                  <BannerRow
                    key={banner.id}
                    banner={banner}
                    selected={selected}
                    refetch={getBannerList}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(banners.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
};

export default BannersPageView;
