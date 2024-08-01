
// LOCAL CUSTOM COMPONENT
import CategoryForm from "../category-form";
import PageWrapper from "../../page-wrapper";
export default function CreateCategoryPageView() {
  return <PageWrapper title="Create Category">
      <CategoryForm isEdit={false} />
    </PageWrapper>;
}