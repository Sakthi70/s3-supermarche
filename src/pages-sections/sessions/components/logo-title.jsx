import Image from "next/image"; 
// CUSTOM COMPONENTS

import { H5 } from "components/Typography";
import FlexRowCenter from "components/flex-box/flex-row-center"; 
// IMPORT IMAGES

import logo from "../../../../public/assets/images/S3/s3.png";
import Link from "next/link";
export default function LogoWithTitle() {
  return  <Link href={`/`} className="link">
  <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image src={logo}  height={60} width={50} alt="bazaar" />
      <H5 fontWeight={700}>Welcome To S3 Supermarche</H5>
    </FlexRowCenter>
    </Link>
}