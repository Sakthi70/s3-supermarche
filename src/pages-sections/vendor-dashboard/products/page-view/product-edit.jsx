"use client";
// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { t } from "utils/util";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "actions/products";
import { Box, CircularProgress } from "@mui/material";
export default function EditProductPageView() {
  const params = useParams();

  const [product, setProduct] = useState();

  useEffect(() => {
    getproductById();
  }, []);

  const getproductById = async() => {
    let prod = await getProductById(params.slug);
    setProduct(prod);
  }
  

  return <PageWrapper title={t("Edit Product")}>
     {product ? <ProductForm isEdit={true} product={product} /> : <Box minHeight={400} width={1} display={'flex'} justifyContent={'center'} alignItems={'center'}><CircularProgress/></Box> }
    </PageWrapper>;
}