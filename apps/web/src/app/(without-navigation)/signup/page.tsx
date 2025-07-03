import { notFound } from "next/navigation";

import Header from "@/components/header";
import ProgessBar from "@/components/signup/progess-bar";
import SignupPage from "@/page/signup";

interface SignupProps {
  searchParams: Promise<{
    step: string;
  }>;
}

export default async function Signup({ searchParams }: SignupProps) {
  const { step } = await searchParams;

  if (+step < 0 || +step > 4) {
    return notFound();
  }

  return (
    <>
      <Header />
      <ProgessBar step={step ?? "0"} />
      <SignupPage step={step ?? "0"} />
    </>
  );
}
