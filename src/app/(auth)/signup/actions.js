"use server";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signUp({ email, password });

  const isLikelyAlreadyRegistered = !data.user && !error;

  if (isLikelyAlreadyRegistered) {
    return {
      error: "This email is already registered. Please log in instead.",
    };
  }

  if (error) {
    if (
      error.message.toLowerCase().includes("already registered") ||
      error.message.toLowerCase().includes("user already exists")
    ) {
      return { error: "This email is already registered. Please log in." };
    }
    return { error: "Signup failed: " + error.message };
  }

  return { success: true };
}
