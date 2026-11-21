import { PageIntro } from "@/components/workspace/shell";
import { InquiryForm } from "@/features/client/inquiry-form";

export default function NewInquiryPage() {
  return (
    <>
      <PageIntro title="New inquiry" lede="Pick the service that matches the work. Data annotation, evaluation, consulting, and application delivery stay distinct." />
      <InquiryForm />
    </>
  );
}
