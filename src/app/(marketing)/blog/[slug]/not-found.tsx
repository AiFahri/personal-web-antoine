import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-[SpaceGroteskBold]">
          Post Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-[#C44829] hover:bg-[#B03E25] text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}





