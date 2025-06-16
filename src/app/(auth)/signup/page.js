"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { signup } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      try {
        const result = await signup(formData);
        if (result?.error) {
          toast.error(result.error);
          if (result.error.includes("already registered")) {
            router.push("/login");
          }
        } else {
          toast.success("Signup successful! Please check your email.");
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center gradient-title">
            Create Your Account 🚀
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
