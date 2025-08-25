import Link from "next/link";
import { redirect } from "next/navigation";

import Search from "@/assets/search.svg";
import Header from "@/components/common/header";
import { USER } from "@/constants/user";
import { BaseResponseDTO } from "@/models";
import MypagePage from "@/page/mypage";
import { serverApi } from "@/services/api";
import { getCookie } from "@/utils/cookie";
import { userInfoDTO } from "@repo/types";

export default async function Mypage() {
  const isTokenExist = await getCookie("accessToken");

  if (!isTokenExist) {
    redirect("/home");
  }

  const { data } = await serverApi.get<BaseResponseDTO<userInfoDTO>>("users", {
    next: { tags: [USER.GET_USER_INFO] },
  });

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
      <MypagePage user={data} />
    </>
  );
}
