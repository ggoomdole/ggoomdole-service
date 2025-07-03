"use client";

import { useRouter } from "next/navigation";

import AgreementStep from "@/components/signup/agreement-step";
import CompleteStep from "@/components/signup/complete-step";
import NameStep from "@/components/signup/name-step";
import NativeStep from "@/components/signup/native-step";
import ProfileStep from "@/components/signup/profile-step";
import { SignUpForm, signUpFormSchema } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface SignupPageProps {
  step: string;
}

export default function SignupPage({ step }: SignupPageProps) {
  const router = useRouter();

  const form = useForm<SignUpForm>({
    mode: "onChange",
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      agreement: false,
      profileImage: undefined,
      nickname: "",
      native: 0,
    },
    shouldUnregister: true,
  });

  const onNext = () => router.push(`?step=${+step + 1}`);

  const onSubmit = () => {
    const values = form.getValues();
    console.log(values);
  };

  switch (step) {
    case "0":
      return <AgreementStep form={form} onNext={onNext} />;
    case "1":
      return <ProfileStep onNext={onNext} />;
    case "2":
      return <NameStep onNext={onNext} />;
    case "3":
      return <NativeStep onSubmit={onSubmit} />;
    case "4":
      return <CompleteStep />;
  }
}
