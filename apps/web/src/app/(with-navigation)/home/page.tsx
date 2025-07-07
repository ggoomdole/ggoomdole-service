import Link from "next/link";

import Search from "@/assets/search.svg";
import Header from "@/components/common/header";
import HomePage from "@/page/home";

export default function Home() {
  return (
    <>
      <Header
        logoHeader
        rightElement={
          <Link href="/search">
            <Search />
          </Link>
        }
        className="sticky top-0"
      />
      <HomePage />
    </>
  );
}
