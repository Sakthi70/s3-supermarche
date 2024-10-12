"use client";

import { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Person from "@mui/icons-material/Person"; 
// Local CUSTOM COMPONENT

import ProfileEditForm from "../../../customer-dashboard/profile/edit-form";
import ProfilePicUpload from "../../../customer-dashboard/profile/profile-pic-upload";
import DashboardHeader from "../../../customer-dashboard/dashboard-header"; 
import { useSession } from "next-auth/react";
import { finduserById } from "actions/user";
import { PageLoader } from "pages-sections/vendor-dashboard/categories/page-view/create-category";
import { useParams } from "next/navigation";
import { Box } from "@mui/material";
// CUSTOM DATA MODEL


// ===========================================================
export default function AdminProfileEditPageView() {
  const [userDetail, setuserDetail] = useState()
  const [file, setfile] = useState();
  const {id} = useParams();
  useEffect(() => {
        getUserDetails(id);
  }, [id])
  

  const getUserDetails =async(id) => {
   await finduserById(id).then(x => setuserDetail(x));
  } 

  const handleChangeDropZone = (file) => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setfile(file);
  };

  return <Box sx={{ my: 4}}>{!userDetail ? <PageLoader/> :<Fragment>
      {
      /* TITLE HEADER AREA */
    }
      <DashboardHeader Icon={Person} href="/admin/customers" title="Edit Profile" buttonText="Back to Customers" />

      <Card sx={{
      p: 3
    }}>
        {
        /* USER PROFILE PIC */
      }
        <ProfilePicUpload image={file?.preview || userDetail.image} onImageChange={handleChangeDropZone} />

        {
        /* PROFILE EDITOR FORM */
      }
        <ProfileEditForm isAdmin={true} id={id} oldImage={userDetail?.image} newImage={file} user={userDetail} />
      </Card>
    </Fragment>}</Box>;
}