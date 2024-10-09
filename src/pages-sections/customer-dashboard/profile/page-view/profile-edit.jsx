"use client";

import { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Person from "@mui/icons-material/Person"; 
// Local CUSTOM COMPONENT

import ProfileEditForm from "../edit-form";
import ProfilePicUpload from "../profile-pic-upload";
import DashboardHeader from "../../dashboard-header"; 
import { useSession } from "next-auth/react";
import { finduserById } from "actions/user";
import { PageLoader } from "pages-sections/vendor-dashboard/categories/page-view/create-category";
// CUSTOM DATA MODEL


// ===========================================================
export default function ProfileEditPageView() {
  const [userDetail, setuserDetail] = useState()
  const [file, setfile] = useState();
  const {data:session, status} = useSession();
  useEffect(() => {
   if(session.user){
        getUserDetails(session.user.id);
   }
  }, [session])
  

  const getUserDetails =async(id) => {
   await finduserById(id).then(x => setuserDetail(x));
  } 

  const handleChangeDropZone = (file) => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setfile(file);
  };

  return <>{!userDetail ? <PageLoader/> :<Fragment>
      {
      /* TITLE HEADER AREA */
    }
      <DashboardHeader Icon={Person} href="/profile" title="Edit Profile" buttonText="Back to Profile" />

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
        <ProfileEditForm id={session.user.id} oldImage={userDetail?.image} newImage={file} user={userDetail} />
      </Card>
    </Fragment>}</>;
}