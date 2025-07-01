"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ArrowLeft from "@/assets/arrow-left.svg";

const logo = "/static/logo.png";

interface HeaderProps {
  logoHeader?: boolean;
  rightElement?: React.ReactNode;
  children?: React.ReactNode;
  onClickBack?: () => void;
}

export default function Header({ logoHeader, rightElement, children, onClickBack }: HeaderProps) {
  const router = useRouter();

  const onClickBackButton = () => {
    if (onClickBack) {
      return onClickBack();
    }
    router.back();
  };

  return (
    <header className="h-header shadow-layout z-50 flex items-center justify-between gap-2.5 bg-white px-5">
      {logoHeader ? (
        <Link href="/home">
          <Image src={logo} alt="순례해유 로고" width={100} height={24} />
        </Link>
      ) : (
        <button onClick={onClickBackButton}>
          <ArrowLeft />
        </button>
      )}
      {!logoHeader && <div className="text-semibold flex-1 text-center">{children}</div>}
      <div className="flex min-w-6 items-center">{rightElement}</div>
    </header>
  );
}
