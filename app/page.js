"use client";
import { useTheme } from "next-themes";
import ChatInputBox from "./_components/ChatInputBox";

export default function Home() {
  const {setTheme} = useTheme();
  return (
    <div>
      <ChatInputBox />
    </div>
  );
}
