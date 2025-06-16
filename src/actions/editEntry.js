"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function editEntry(formData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw new Error("Unauthorized");

  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");

  let imageUrl = null;

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

    if (uploadError) throw new Error(uploadError.message);

    const {
      data: { publicUrl },
    } = supabase.storage.from("journal-images").getPublicUrl(filePath);

    imageUrl = publicUrl;
  }

  const { error: updateError } = await supabase
    .from("entries")
    .update({
      title,
      content,
      ...(imageUrl && { image_url: imageUrl }),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (updateError) throw new Error(updateError.message);

  revalidatePath(`/journal/${id}`);
}
