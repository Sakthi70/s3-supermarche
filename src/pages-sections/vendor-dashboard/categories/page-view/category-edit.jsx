"use client"; 
// LOCAL CUSTOM COMPONENT

import CategoryForm from "../category-form";
import PageWrapper from "../../page-wrapper";
import { useParams } from "next/navigation";
import useApp from "hooks/useApp";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
export default function EditCategoryPageView() {
  const params = useParams();
  const [selectedCategory, setSelectedCategory] = useState();

  const {content} = useApp();
  const {categories} = content;

  useEffect(() => {
    if(categories.length > 0){
      let category = categories.find(x => x.slug === `/${params.slug.join('/').replaceAll('%20', ' ')}`);
      
      let parent = "";
      if(category && category.parentId !== null){
         parent= categories.find(x => x.id === category.parentId).slug
      }
      setSelectedCategory({...category, parent})
    }
  }, [categories])
  

  return <PageWrapper title="Edit Category">
    {selectedCategory ?
      <CategoryForm  isEdit={true} category={selectedCategory} /> : <Box height={500} display={'flex'} alignItems={'center'} justifyContent={'center'}><CircularProgress /></Box>}
    </PageWrapper>;
}