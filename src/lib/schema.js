import { z } from "zod";

const isEmptyQuillContent = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent?.trim() === "";
};

export const journalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .refine((val) => !isEmptyQuillContent(val), {
      message: "Content cannot be empty",
    }),
  image: z.any().optional(),
});
