import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ChevronRight, FileText, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotebookText, ShieldCheck, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDailyPrompt } from "@/actions/public";
import Link from "next/link";

export const metadata = {
  title: "Journex – Reflect. Write. Grow.",
  description: "Your personal journaling space to write, reflect, and find clarity.",
};

const features = [
  {
    icon: NotebookText,
    title: "Effortless Journaling",
    description:
      "Write your thoughts, track your mood, and reflect with ease using a distraction-free interface.",
  },
  {
    icon: Brain,
    title: "Clarity & Reflection",
    description:
      "Look back on your past entries to identify patterns and build emotional awareness over time.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Your journal is yours alone. All entries are securely stored and protected by default.",
  },
];

export default async function Home() {
  
  let advice;
  try {
    advice = await getDailyPrompt();
  } catch (err) {
    console.error("Failed to fetch prompt", err);
    advice = null;
  }

  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 gradient-title">
          Organize your thoughts. <br /> Own your narrative.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          A quiet place to write, feel, and reflect — safely and beautifully.
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-50 via-transparent to-transparent pointer-events-none z-10" />
          <div className="bg-white rounded-2xl p-4 max-full mx-auto">
            <div className="border-b border-orange-100 pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-700" />
                <span className="text-emerald-900 font-medium">
                  Today&rsquo;s Entry
                </span>
              </div>

              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-teal-200" />
                <div className="h-3 w-3 rounded-full bg-teal-300" />
                <div className="h-3 w-3 rounded-full bg-teal-400" />
              </div>
            </div>

            <div className="space-y-4 p-4">
              <h3 className="text-xl font-semibold text-teal-900">
                {advice ?? "My Thoughts Today"}
              </h3>
              <Skeleton className="h-4 bg-teal-100 rounded w-3/4" />
              <Skeleton className="h-4 bg-teal-100 rounded w-full" />
              <Skeleton className="h-4 bg-teal-100 rounded w-2/3" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button
              variant="journal"
              className="px-8 py-6 rounded-full flex items-center gap-1"
            >
              Start Writing <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="px-8 py-6 rounded-full border-teal-600 text-teal-600 hover:bg-teal-500 hover:text-white"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      <section
        id="features"
        className="mt-24 grid m:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-xl text-gray-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-teal-700">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="space-y-24 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600">
              Rich Text Editor
            </h3>
            <p className="text-lg text-teal-700">
              Express yourself fully with our powerful editor featuring:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-400" />
                <span>Format text with ease</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-400" />
                <span>Embed links</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-teal-100">
            <div className="flex gap-2 mb-6">
              <div className="h-8 w-8 rounded bg-teal-100" />
              <div className="h-8 w-8 rounded bg-teal-100" />
              <div className="h-8 w-8 rounded bg-teal-100" />
            </div>
            <div className="h-4 bg-teal-50 rounded w-3/4" />
            <div className="h-4 bg-teal-50 rounded w-full" />
            <div className="h-4 bg-teal-50 rounded w-2/3" />
            <div className="h-4 bg-teal-50 rounded w-1/3" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-teal-100">
            <div className="h-40 bg-gradient-to-t from-emerald-100 to-teal-50 rounded-lg" />
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-teal-100 rounded" />
              <div className="h-4 w-16 bg-teal-100 rounded" />
              <div className="h-4 w-16 bg-teal-100 rounded" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
              <ImagePlus className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600">
              Upload Journal Images
            </h3>
            <p className="text-lg text-teal-700">
              Personalize your journal entries with optional image uploads.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-400" />
                <span>Attach photos or scanned notes</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-teal-400" />
                <span>Your images are private and only visible to you</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <Card className="bg-gradient-to-r from-emerald-100 to-green-100">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-600 mb-6">
              Start Writing Your Journex Today
            </h2>
            <p className="text-lg text-teal-700 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who have already discovered the power of
              digital journaling.
            </p>
            <Link href="/dashboard">
              <Button size="lg" variant="journal" className="animate-bounce">
                Get Started for Free <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
