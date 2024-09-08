"use client";
// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { t } from "utils/util";
export default function EditProductPageView() {
  return <PageWrapper title={t("Edit Product")}>
      <ProductForm />
    </PageWrapper>;
}