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
// Local CUSTOM COMPONENT

import SearchArea from "../../search-box";
import CustomerRow from "../customer-row";
import PageWrapper from "../../page-wrapper"; 
// TABLE HEAD COLUMN DATA

import { tableHeading } from "../table-heading"; 
import { useEffect, useState } from "react";
import { deleteCustomer, getUsers, updateUserDetail } from "actions/user";
import useApp from "hooks/useApp";
import { useSession } from "next-auth/react";
// =============================================================================


// =============================================================================
export default function CustomersPageView({
}) {


  const {data} =useSession();

  const {loading} = useApp();
  
  
  const [customers, setcustomers] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
      getcustomers();
  }, [])
  
  const getcustomers =async()=>{
    loading(true)
    await getUsers().then((users) => setcustomers(users.filter( x=> x.id !== data.user.id))).finally(() => loading(false))
  }

  const onDelete =async(id, count)=> {
    loading(true);
    await deleteCustomer(id, count).then(async() => await getcustomers()).finally(() => loading(false))
  }

  const onUpdate =async(id,isAdmin) => {
    loading(true);
    await updateUserDetail({isAdmin:!isAdmin}, id).then(async() => await getcustomers()).finally(() => loading(false))
  }


  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: customers.filter(x => x.name.includes(search) || x.email.includes(search) || x.phone.includes(search))
  });
    
  return <PageWrapper title="Customers">
      <SearchArea isCreate={false}  isSearch={true}  handleSearch={(e) =>  setsearch(e.target.value)}  searchPlaceholder="Search Customer..." />

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(customer => <CustomerRow customer={customer} updateUser={onUpdate} deleteUser={onDelete} key={customer.id} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </PageWrapper>;
}