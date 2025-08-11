"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import AgreementStep from "@/components/signup/agreement-step";
import CompleteStep from "@/components/signup/complete-step";
import NativeStep from "@/components/signup/native-step";
import NicknameStep from "@/components/signup/nickname-step";
import ProfileStep from "@/components/signup/profile-step";
import { SignUpForm, signUpFormSchema } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface SignupPageProps {
  step: string;
}

export default function SignupPage({ step }: SignupPageProps) {
  const signupComplete = useRef(false);

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
  });

  const onNext = () => router.push(`?step=${+step + 1}`);

  const onSubmit = () => {
    const values = form.getValues();
    console.log(values);
    signupComplete.current = true;
    onNext();
  };

  if (+step < 4 && signupComplete.current) {
    throw new Error("회원가입이 완료되었어요.");
  }

  useEffect(() => {
    const validatePreviousStepsOrThrow = (currentStep: number, values: SignUpForm): void => {
      const isAgreementValid = values.agreement === true;
      const isProfileImageValid = values.profileImage instanceof File;
      const isNicknameValid = typeof values.nickname === "string" && values.nickname.length >= 1;

      if (
        (!isAgreementValid && currentStep >= 1) ||
        (!isProfileImageValid && currentStep >= 2) ||
        (!isNicknameValid && currentStep >= 3)
      ) {
        alert("잘못된 요청이에요. 처음부터 다시 진행해 주세요.");
        router.replace("?");
      }
    };

    validatePreviousStepsOrThrow(+step, form.getValues());
  }, [step]);

  switch (step) {
    case "0":
      return <AgreementStep form={form} onNext={onNext} />;
    case "1":
      return <ProfileStep form={form} onNext={onNext} />;
    case "2":
      return <NicknameStep form={form} onNext={onNext} />;
    case "3":
      return <NativeStep form={form} onSubmit={onSubmit} />;
    case "4":
      return <CompleteStep />;
  }
}
