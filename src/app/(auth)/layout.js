import { Suspense } from "react";

export default function AuthLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}