import Link from "next/link";

export default function CompleteStep() {
  return (
    <>
      <main className="pb-with-floating-button flex flex-col p-5">
        <h1 className="typo-bold">
          회원가입이
          <br />
          완료되었습니다
        </h1>
      </main>
      <Link
        href="/home"
        className="from-main-700 to-main-900 typo-semibold max-w-floating-button fixed bottom-10 w-[calc(100%-1.25rem)] self-center rounded-xl bg-gradient-to-r py-5 text-center text-white transition-colors disabled:from-gray-100 disabled:to-gray-100 disabled:text-gray-300"
      >
        다음
      </Link>
    </>
  );
}
