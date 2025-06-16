"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createEntry(formData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Please login to create a journal." };
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");

  let imageUrl = null;

  try {
    if (image && image.size > 0) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("journal-images")
        .upload(filePath, image, {
          contentType: image.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        return { error: `Image upload failed: ${uploadError.message}` };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("journal-images").getPublicUrl(filePath);
      imageUrl = publicUrl;
    }

    const { error: insertError } = await supabase.from("entries").insert({
      user_id: user.id,
      title,
      content,
      image_url: imageUrl,
    });

    if (insertError) {
      return { error: `Could not create entry: ${insertError.message}` };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error("Unexpected error in createEntry:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
