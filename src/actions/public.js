"use server";
import { unstable_cache } from "next/cache";

export const getDailyPrompt = unstable_cache(
  async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store",
      });
      const data = await res.json();
      return data.slip.advice;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: "What's on your mind today?",
      };
    }
  },
  ["daily-prompt"],
  {
    revalidate: 86400,
    tags: ["daily-prompt"],
  }
);
