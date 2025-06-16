import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Journex",
  description: "Team Journal Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <div className="bg-[url('/bg.jpg')] opacity-50 fixed -z-10 inset-0 bg-cover bg-center" />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          <footer className="bg-orange-300/10 py-12">
            <div className="mx-auto px-4 text-center text-gray-900">
              <p>Made with 🖤 by Yuvraj Gupta</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
