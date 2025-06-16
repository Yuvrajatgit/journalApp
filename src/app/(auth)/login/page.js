"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { login } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      try {
        const result = await login(formData);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Login successful!");
          router.push("/dashboard");
        }
      } catch (err) {
        console.error(err);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  useEffect(() => {
    if (error === "confirmation_failed") {
      toast.error(
        "Email confirmation failed. Please try again or contact support."
      );
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center gradient-title">
            Welcome Back 👋
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
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
                {isPending ? "Logging in..." : "Log In"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
