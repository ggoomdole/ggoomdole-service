"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import ArrowLeft from "@/assets/arrow-left.svg";

const logo = "/static/logo.png";

interface HeaderProps {
  logoHeader?: boolean;
  rightElement?: React.ReactNode;
  children: React.ReactNode;
  onClickLeft?: () => void;
}

export default function Header({ logoHeader, rightElement, children, onClickLeft }: HeaderProps) {
  const router = useRouter();

  const onClickLeftButton = () => {
    if (onClickLeft) {
      return onClickLeft();
    }
    router.back();
  };

  return (
    <header className="h-header shadow-layout z-50 flex items-center justify-between gap-2.5 bg-white px-5">
      {logoHeader ? (
        <Image src={logo} alt="순례해유 로고" width={100} height={24} />
      ) : (
        <button onClick={onClickLeftButton}>
          <ArrowLeft />
        </button>
      )}
      {!logoHeader && <div className="text-semibold flex-1 text-center">{children}</div>}
      <div className="flex min-w-6 items-center">{rightElement}</div>
    </header>
  );
}
