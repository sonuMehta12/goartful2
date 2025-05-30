import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo({ className }: { className?: string }) {
  const { theme } = useTheme();

  const logoSrc = theme === "dark" ? "/logofordarktheme.png" : "/logo.png";

  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <div className="relative">
        <Image
          src={logoSrc}
          alt="GoArtful Logo"
          width={150}
          height={60}
          className="h-8 w-auto sm:h-9 md:h-10 transition-opacity duration-300 group-hover:opacity-90"
          priority
        />
      </div>
    </Link>
  );
}
