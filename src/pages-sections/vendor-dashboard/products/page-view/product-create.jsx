"use client";
// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { t } from "utils/util";
export default function ProductCreatePageView() {
  return <PageWrapper title={t("Add New Product")}>
      <ProductForm />
    </PageWrapper>;
}