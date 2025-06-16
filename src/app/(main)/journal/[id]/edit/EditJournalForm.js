"use client";

import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from "@/lib/schema";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { editEntry } from "@/actions/editEntry";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditJournalForm({ entry }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: entry.title,
      content: entry.content,
      image: undefined,
    },
  });

  const handleUpdate = handleSubmit(async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", entry.id);
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await editEntry(formData);
      toast.success("Journal updated successfully!");
      router.push(`/journal/${entry.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update journal. Please try again.", {
        action: {
          label: "Retry",
          onClick: () => handleUpdate(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="py-8">
      <form className="space-y-2 mx-auto" onSubmit={handleUpdate}>
        <h1 className="text-5xl md:text-6xl gradient-title">Edit Your Entry</h1>
        {isLoading && <BarLoader color="teal" width="100%" />}

        <div className="space-y-2 mt-8 flex gap-2 flex-col">
          <label className="text-md font-medium text-gray-600">Title</label>
          <Input
            disabled={isLoading}
            {...register("title")}
            placeholder="Edit your title..."
            className={`py-5 md:text-md bg-white ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2 mt-8 flex gap-2 flex-col">
          <Label
            htmlFor="picture"
            className="text-md font-medium text-gray-600"
          >
            Update Picture (optional)
          </Label>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Input
                id="picture"
                type="file"
                className="bg-white text-gray-600"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
        </div>

        <div className="space-y-2 mt-8 flex gap-2 flex-col">
          <label className="text-sm font-medium text-gray-600">Content</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                className="bg-white"
                readOnly={isLoading}
                theme="snow"
                value={field.value || ""}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        <div className="space-y-4 mt-4 flex">
          <Button disabled={isLoading} type="submit" variant="journal">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
