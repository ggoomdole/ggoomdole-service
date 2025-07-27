import Button from "../common/button";
import { DialogClose, DialogContent } from "../common/dialog";

export default function Logout() {
  return (
    <DialogContent className="space-y-5 text-center">
      <h3 className="typo-semibold">로그아웃</h3>
      <p className="typo-medium">로그아웃 하시겠습니까?</p>
      <div className="flex gap-2.5">
        <DialogClose className="typo-semibold from-main-700 to-main-900 flex-1 rounded-xl bg-gradient-to-r py-5 text-white">
          취소
        </DialogClose>
        <Button className="flex-1" variant="warning" onClick={() => {}}>
          로그아웃
        </Button>
      </div>
    </DialogContent>
  );
}
