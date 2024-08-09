"use client"; 
// LOCAL CUSTOM COMPONENT

import PageWrapper from "../../page-wrapper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getBannerById } from "actions/banner";
import useApp from "hooks/useApp";
import BannerForm from "../banner-form";
export default function EditBannerPageView() {
  const params = useParams();
const [banner, setBanner] = useState({});
const {loading} = useApp();

const getBanner =async(id)=> {
  
    await getBannerById(id).then((banner) => {
      setBanner(banner)})
}

  useEffect(() => {
    loading(true);
    if(params.slug){
        
        getBanner(params.slug[0]);
        loading(false);
    }
  }, [params.slug])
  

  return <PageWrapper title="Edit Banner">
    {banner ?
      <BannerForm isEdit={true} banner={banner}/> : <Box height={500} display={'flex'} alignItems={'center'} justifyContent={'center'}><CircularProgress /></Box>}
    </PageWrapper>;
}