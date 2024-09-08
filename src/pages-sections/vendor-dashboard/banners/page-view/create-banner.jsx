"use client";
// LOCAL CUSTOM COMPONENT
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import BannerForm from "../banner-form";
import { useTranslation } from "react-i18next";
export default function CreateBannerPageView() {
  const {t} = useTranslation();
  return <PageWrapper title={t("Create Banner")}>
      <BannerForm isEdit={false} />
    </PageWrapper>;
}