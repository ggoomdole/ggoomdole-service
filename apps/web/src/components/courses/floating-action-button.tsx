"use client";

import { useState } from "react";

import Folder from "@/assets/folder.svg";
import Enter from "@/assets/login.svg";
import More from "@/assets/more.svg";
import Send from "@/assets/send.svg";
import { cn } from "@/lib/utils";

const ACTION_BUTTONS = [
  {
    icon: Enter,
    text: "순례길 참여하기",
    value: "participate",
  },
  {
    icon: Send,
    text: "장소 추가 요청하기",
    value: "add-place",
  },
  {
    icon: Folder,
    text: "나의 순례길로 가져오기",
    value: "my-course",
  },
];

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-[calc(var(--spacing-navigation)+1.25rem)] mr-5 self-end">
      <button
        className="bg-main-100 text-main-900 shadow-floating-action-button relative z-10 rounded-full p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <More />
      </button>
      <div className="absolute top-0 flex w-full flex-col items-end gap-2 pr-2">
        {ACTION_BUTTONS.map((button, index) => (
          <div
            key={button.text}
            className={cn(
              "pointer-events-none absolute top-0 flex items-center gap-2 opacity-0 transition-all duration-300",
              isOpen && "pointer-events-auto opacity-100"
            )}
            style={{
              transform: isOpen
                ? `translateY(calc(-100% - ${(ACTION_BUTTONS.length - 1 - index) * 48 + 8}px)`
                : "translateY(0px)",
              transitionDelay: isOpen
                ? `${index * 100}ms`
                : `${(ACTION_BUTTONS.length - 1 - index) * 100}ms`,
            }}
          >
            <p className="typo-regular text-nowrap rounded-sm bg-white px-2.5 py-1 text-gray-700 shadow-xl">
              {button.text}
            </p>
            <button className="bg-main-900 flex size-10 shrink-0 items-center justify-center rounded-full text-white">
              <button.icon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
