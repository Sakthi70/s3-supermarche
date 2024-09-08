"use client";
// LOCAL CUSTOM COMPONENT
import CategoryForm from "../category-form";
import PageWrapper from "../../page-wrapper";
import { t } from "utils/util";
export default function CreateCategoryPageView() {
  return <PageWrapper title={t("Create Category")}>
      <CategoryForm isEdit={false} />
    </PageWrapper>;
}