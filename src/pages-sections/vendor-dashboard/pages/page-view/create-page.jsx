"use client";
// LOCAL CUSTOM COMPONENT
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import { useTranslation } from "react-i18next";
import PageForm from "../page-form";
export default function CreatePageView() {
  const {t} = useTranslation();

  

  return <PageWrapper title={t("Create Page")}>
    <PageForm isEdit={false}/>
    </PageWrapper>;
}