import Link from "next/link";

import Search from "@/assets/search.svg";
import Header from "@/components/common/header";
import MypagePage from "@/page/mypage";

export default function Mypage() {
  return (
    <>
      <Header
        logoHeader
        rightElement={
          <Link href="/search">
            <Search />
          </Link>
        }
      />
      <MypagePage />
    </>
  );
}
