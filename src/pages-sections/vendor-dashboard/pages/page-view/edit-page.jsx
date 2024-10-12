"use client"; 
// LOCAL CUSTOM COMPONENT

import PageWrapper from "../../page-wrapper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useApp from "hooks/useApp";
import { useTranslation } from "react-i18next";
import PageForm from "../page-form";
import { getPageById } from "actions/pages";
import { PageLoader } from "pages-sections/vendor-dashboard/categories/page-view/create-category";

export default function EditPageView() {
  const params = useParams();
const [page, setPage] = useState();
const {loading} = useApp();
const {t} = useTranslation();
const getPage =async(id)=> {
  
    await getPageById(id).then((page) => {
      console.log(page)
        setPage(page)})
}

  useEffect(() => {
    loading(true);
    if(params.slug){
        getPage(params.slug);
        loading(false);
    }
  }, [params.slug])
  

  return <PageWrapper title={t("Edit Page")}>
    {page ?
      <PageForm isEdit={true} page={page}/> : <PageLoader/>}
    </PageWrapper>;
}