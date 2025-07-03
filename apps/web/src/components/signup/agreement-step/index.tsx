import { useState } from "react";

import { SignUpForm } from "@/schemas/signup";

import { UseFormReturn } from "react-hook-form";

import AgreementItem from "./agreement-item";
import Button from "../../button";
import Checkbox from "../../checkbox";

interface AgreementStepProps {
  form: UseFormReturn<SignUpForm>;
  onNext: () => void;
}

const defaultAgreementItems = [
  {
    id: 1,
    essential: true,
    checked: false,
    title: "이용약관 동의",
    description: "이용약관 동의 description",
  },
  {
    id: 2,
    essential: true,
    checked: false,
    title: "개인정보 수집 및 이용동의",
    description: "개인정보 수집 및 이용동의 description",
  },
];

export default function AgreementStep({ form, onNext }: AgreementStepProps) {
  const [agreementItems, setAgreementItems] = useState(() => {
    const initialAgreement = form.getValues("agreement");
    return defaultAgreementItems.map((item) => ({
      ...item,
      checked: initialAgreement,
    }));
  });

  const isAllAgreementChecked = agreementItems.every((item) => item.checked);

  const onToggleAllAgreement = () => {
    setAgreementItems((prev) => prev.map((item) => ({ ...item, checked: !isAllAgreementChecked })));
  };

  const onToggleAgreement = (id: number) => {
    setAgreementItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const onClickNext = () => {
    form.setValue("agreement", isAllAgreementChecked);
    onNext();
  };

  return (
    <>
      <main className="pb-with-floating-button flex flex-col p-5">
        <section className="flex flex-col gap-10">
          <h1 className="typo-bold">환영합니다!</h1>
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <Checkbox checked={isAllAgreementChecked} onChange={onToggleAllAgreement} />
              <p className="typo-medium">약관 전체동의</p>
            </div>
            {agreementItems.map((item) => (
              <AgreementItem
                key={`agreement-item-${item.id}`}
                {...item}
                onChecked={() => onToggleAgreement(item.id)}
              />
            ))}
          </div>
        </section>
      </main>
      <Button
        onClick={onClickNext}
        disabled={!isAllAgreementChecked}
        className="max-w-floating-button fixed bottom-10 w-full self-center"
      >
        다음
      </Button>
    </>
  );
}
