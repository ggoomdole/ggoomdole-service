"use client";

import Button from "../common/button";
import { DialogClose, DialogContent } from "../common/dialog";

export default function Withdraw() {
  return (
    <DialogContent className="space-y-5 text-center">
      <h3 className="typo-semibold">탈퇴하기</h3>
      <p className="typo-medium">
        탈퇴하시면 모든 데이터가 삭제되며
        <br />
        복구할 수 없어요.
      </p>
      <div className="flex gap-2.5">
        <DialogClose className="typo-semibold from-main-700 to-main-900 flex-1 rounded-xl bg-gradient-to-r py-5 text-white">
          취소
        </DialogClose>
        <Button className="flex-1" variant="warning" onClick={() => {}}>
          탈퇴
        </Button>
      </div>
    </DialogContent>
  );
}
