"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ClientToast({ message, type = "error" }) {
  useEffect(() => {
    toast[type](message);
  }, [message, type]);

  return null;
}
