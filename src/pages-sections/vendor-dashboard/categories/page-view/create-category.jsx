"use client";
// LOCAL CUSTOM COMPONENT
import CategoryForm from "../category-form";
import PageWrapper from "../../page-wrapper";
import { t } from "utils/util";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useApp from "hooks/useApp";
import { Box, CircularProgress } from "@mui/material";
export default function CreateCategoryPageView() {
  const params = useParams();
  const [selectedCategory, setSelectedCategory] = useState();

  const {content} = useApp();
  const {categories} = content;

  useEffect(() => {
    if(categories.length > 0){
      let category = categories.find(x => x.id === params.slug);
      
      let parent = "";
      if(category && category.parentId !== null){
         parent= categories.find(x => x.id === category.parentId).slug
      }
      setSelectedCategory({...category, parent})
    }
  }, [categories])
  return <PageWrapper title={t("Create Category")}>
    {selectedCategory ?
      <CategoryForm  isEdit={false} slug={selectedCategory.slug}  slugId={selectedCategory.id}/> : <Box height={500} display={'flex'} alignItems={'center'} justifyContent={'center'}><CircularProgress /></Box>}
    </PageWrapper>;
}