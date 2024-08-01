"use client";
import { Backdrop } from "@mui/material";
import useSettings from "hooks/useSettings";
import Image from "next/image";

const Loading = () => {
  const {settings} = useSettings();
  return settings.loading && 
  <Backdrop
  sx={{
    zIndex:9999}}
  open={settings.loading}
>
  <Image src={'/assets/images/S3/loader.gif'} width={150} height={100} alt={'lading'} />
</Backdrop>

  
};

export default Loading;