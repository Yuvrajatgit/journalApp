"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { deleteEntry } from "@/actions/deleteEntry";

export function EntryActions({ id }) {
  const [isPending, startTransition] = useTransition();
  const [isEditLoading, setIsEditLoading] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    setIsEditLoading(true);
    router.push(`/journal/${id}/edit`);
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteEntry(id);
        toast.success("Entry deleted successfully!");
        router.push("/dashboard");
      } catch (error) {
        toast.error("Failed to delete entry");
        console.error(error);
      }
    });
  };

  return (
    <div className="flex justify-end gap-4 mt-8">
      <Button variant="secondary" onClick={handleEdit} disabled={isEditLoading}>
        {isEditLoading ? (
          <div className="flex items-center gap-2">
            <ClipLoader size={16} color="#000" />
            Loading...
          </div>
        ) : (
          "Edit"
        )}
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
        {isPending ? (
          <div className="flex items-center gap-2">
            <ClipLoader size={16} color="#fff" />
            Deleting...
          </div>
        ) : (
          "Delete"
        )}
      </Button>
    </div>
  );
}
