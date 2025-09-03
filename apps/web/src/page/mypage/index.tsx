import Image from "next/image";

import MenuButton from "@/components/mypage/menu-button";
import { MypageProvider } from "@/context/mypage-context";
import { userInfoDTO } from "@repo/types";

interface MypagePageProps {
  user: userInfoDTO;
}

const defaultProfileImage = "/static/default-profile.png";

const MENUS = [
  {
    name: "나의 순례길",
    value: "courses",
    type: "link" as const,
  },
  {
    name: "프로필 설정",
    value: "profile",
    type: "dialog" as const,
  },
  {
    name: "개인 정보 처리 방침",
    value: "privacy",
    type: "link" as const,
  },
  {
    name: "서비스 이용 약관",
    value: "terms",
    type: "link" as const,
  },
  {
    name: "탈퇴하기",
    value: "withdraw",
    type: "dialog" as const,
  },
  {
    name: "로그아웃",
    value: "logout",
    type: "dialog" as const,
  },
];

export default function MypagePage({ user }: MypagePageProps) {
  const profileImage = user.profileImage === "null" ? defaultProfileImage : user.profileImage;

  return (
    <main className="bg-main-300">
      <section className="flex flex-col items-center justify-center gap-5 py-10">
        <Image
          src={profileImage}
          alt="default-profile"
          width={150}
          height={150}
          className="shrink-0 rounded-full object-cover"
        />
        <p className="typo-bold">{user.nickName}</p>
      </section>
      <section className="rounded-t-5xl pb-navigation flex-1 bg-white p-5">
        <MypageProvider nickname={user.nickName} profileImage={profileImage}>
          <ul className="typo-medium flex flex-col">
            {MENUS.map((menu) => (
              <MenuButton key={menu.value} {...menu} />
            ))}
          </ul>
        </MypageProvider>
      </section>
    </main>
  );
}
