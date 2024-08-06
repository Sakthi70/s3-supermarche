
// LOCAL CUSTOM COMPONENT
import PageWrapper from "pages-sections/vendor-dashboard/page-wrapper";
import BannerForm from "../banner-form";
export default function CreateBannerPageView() {
  return <PageWrapper title="Create Banner">
      <BannerForm isEdit={false} />
    </PageWrapper>;
}