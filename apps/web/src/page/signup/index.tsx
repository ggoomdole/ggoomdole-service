import AgreementStep from "@/components/signup/agreement-step";
import CompleteStep from "@/components/signup/complete-step";
import NameStep from "@/components/signup/name-step";
import ProfileStep from "@/components/signup/profile-step";
import ResidenceStep from "@/components/signup/residence-step";

interface SignupPageProps {
  step: string;
}

const renderStep = (step: string) => {
  switch (step) {
    case "0":
      return <AgreementStep />;
    case "1":
      return <ProfileStep />;
    case "2":
      return <NameStep />;
    case "3":
      return <ResidenceStep />;
    case "4":
      return <CompleteStep />;
  }
};

export default function SignupPage({ step }: SignupPageProps) {
  return renderStep(step);
}
