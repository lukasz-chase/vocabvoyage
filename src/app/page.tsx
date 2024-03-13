import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-primary flex-col md:flex-row h-full w-full flex items-center justify-center gap-8 md:gap-32">
      <div>
        <Image
          className="rounded-xl"
          src="/vocabvoyage2.jpg"
          alt="VocabVoyage"
          height="500"
          width="300"
        />
      </div>
      <div className="space-y-4 md:space-y-8 w-full md:w-auto text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          VocabVoyage
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Separator />
          <span className="mt-4">Learn any language</span>
          <span className="mb-4">easily and fast!</span>
          <Separator />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Button variant="black" className="w-3/4" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <Button
            variant="ghost"
            className="border-2 border-accent w-3/4"
            asChild
          >
            <Link href="/sign-in">Log in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
