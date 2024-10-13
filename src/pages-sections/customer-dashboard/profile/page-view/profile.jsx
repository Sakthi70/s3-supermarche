"use client";

import { Fragment, useEffect, useState } from "react";
import Person from "@mui/icons-material/Person"; 
// Local CUSTOM COMPONENT

import UserInfo from "../user-info";
import UserAnalytics from "../user-analytics";
import DashboardHeader from "../../dashboard-header"; 
import DeliveryAddress from "pages-sections/checkout/checkout-alt-form/delivery-address";
import { useSession } from "next-auth/react";
import { createAddress, deleteAddress, finduserById, updateAddress } from "actions/user";
import { PageLoader } from "pages-sections/vendor-dashboard/categories/page-view/create-category";
import { Box, Button, Dialog, useMediaQuery } from "@mui/material";
import Link from "next/link";
import ResetPassword from "pages-sections/sessions/page-view/reset-password";
import Warning from "components/warning/warning";
import useApp from "hooks/useApp";
// CUSTOM DATA MODEL


// ============================================================
export default function ProfilePageView() {
  const [userDetail, setuserDetail] = useState()
  const [isconfirm, setisconfirm] = useState(false)
  const [dailogOpen, setdailogOpen] = useState(false)
  const {loading} =useApp()
  const {data:session, status} = useSession();
  useEffect(() => {
   if(session.user){
        getUserDetails(session.user.id);
   }
  }, [session])
  

  const getUserDetails =async(id) => {
   await finduserById(id).then(x => setuserDetail(x));
  } 

  const handleAddNewAddress =async(address)=>{
      loading(true);
      await createAddress({...address, userId: session.user?.id}).then(async() => await getUserDetails(session.user.id)).finally(()=> loading(false))
  }

  const handleDeleteAddress = async(id)=>{
    loading(true);
      await deleteAddress(id).then(async() => await getUserDetails(session.user.id)).finally(()=> loading(false))
 
  }

  const handleEditAddress =async(data)=>{
    loading(true);
      await updateAddress(data).then(async() => await getUserDetails(session.user.id)).finally(()=> loading(false))
 
  }


  const HeaderComp = () => <Box display={'flex'} gap={2}>
    <Button  color="primary" onClick={()=>setdailogOpen(true)}  sx={{
    bgcolor: "primary.light",
    px: 4
  }}>
      {'Change Password'}
    </Button>
    <Button href={`/profile/${userDetail?.id}`} color="primary" LinkComponent={Link} sx={{
    bgcolor: "primary.light",
    px: 4
  }}>
      {'Edit Profile'}
    </Button>
  </Box>

 const DialogDrawer =() => {
  
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("xs"));
  return <Fragment>
      <Dialog scroll="body" open={dailogOpen} PaperProps={{sx:{p:4}}} fullWidth={isMobile} onClose={() => {setdailogOpen(false)}} sx={{
      zIndex: 9999
    }}>
          <ResetPassword executeCallBack={() => {setdailogOpen(false);setisconfirm(true)}} isEdit={true} email={userDetail.email} />
      </Dialog>

    </Fragment>;
}


  return <>{userDetail ? <Fragment>
      <DialogDrawer />
      <Warning open={isconfirm} handleClose={() => setisconfirm(false)} title={'Password Change'} content={'Your Password has been successfully Changed'}  />
      <DashboardHeader custom={true} customComp={HeaderComp} Icon={Person} title="My Profile" buttonText="Edit Profile" href={`/profile/${userDetail?.id}`} />

     
      <UserAnalytics user={userDetail} />

        <DeliveryAddress handleEditAddress={handleEditAddress} handleDeleteAddress={handleDeleteAddress} handleAddNewAddress={handleAddNewAddress} userId={userDetail.id} addresses={userDetail?.addresses}/> 

      
    </Fragment> : <PageLoader/> }</>;
}