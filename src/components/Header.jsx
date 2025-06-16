"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useAuth } from "./AuthProvider";
import { createClient } from "@/utils/supabase/client";
import { PenBox, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, error } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [redirectingTo, setRedirectingTo] = useState(null);

  const handleLogout = async () => {
    setIsProcessing(true);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during logout");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    setRedirectingTo(null);
  }, [pathname]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong while fetching user session.");
      console.error("Auth error:", error.message);
    }
  }, [error]);

  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            alt="Journex Logo"
            width={200}
            height={60}
            src={"/logo.png"}
            className="h-15 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/journal/write">
                <Button variant="journal" className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Write New</span>
                </Button>
              </Link>

              {pathname !== "/dashboard" && (
                <Link href="/dashboard">
                  <Button variant="outline" className="flex items-center gap-2">
                    Dashboard
                  </Button>
                </Link>
              )}

              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={isProcessing}
                className="flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </Button>
            </>
          ) : (
            <>
              {pathname !== "/login" && (
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={!!redirectingTo}
                    onClick={() => setRedirectingTo("login")}
                  >
                    {redirectingTo === "login" ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4" />
                        Redirecting...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Link>
              )}

              {pathname !== "/signup" && (
                <Link href="/signup">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={!!redirectingTo}
                    onClick={() => setRedirectingTo("signup")}
                  >
                    {redirectingTo === "signup" ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4" />
                        Redirecting...
                      </>
                    ) : (
                      "Signup"
                    )}
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
