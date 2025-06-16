"use client";
import { ClipLoader } from "react-spinners";

export default function Spinner({ size = 36, color = "#0f766e" }) {
  return (
    <div className="flex justify-center items-center h-48">
      <ClipLoader size={size} color={color} />
    </div>
  );
}
