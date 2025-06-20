import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const JoinUsCta = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
          Be Part of the Artful Change
        </h2>
        <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re an artist ready to share your gift, or an
          enthusiast eager to explore your creative side, the GoVibeful
          community welcomes you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white hover:bg-gray-100 text-primary font-bold text-lg px-8 py-7 shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out group"
          >
            <Link href="/join-artful">
              Become a GoVibeful Artist{" "}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent hover:bg-white/10 border-white text-white font-semibold text-lg px-8 py-7 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out group"
          >
            <Link href="/">
              Explore Experiences{" "}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default JoinUsCta;
