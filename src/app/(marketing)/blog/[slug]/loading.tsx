export default function Loading() {
  return (
    <div className="py-12 md:py-16 lg:py-20 animate-pulse">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="mb-4">
          <div className="h-8 w-32 bg-stone-200 rounded-full" />
        </div>

        <div className="mb-6 md:mb-8 space-y-3">
          <div className="h-10 md:h-12 bg-stone-200 rounded w-3/4" />
          <div className="h-10 md:h-12 bg-stone-200 rounded w-1/2" />
        </div>

        <div className="mb-8 md:mb-12">
          <div className="w-full aspect-video md:aspect-[16/10] bg-stone-200 rounded-2xl" />
        </div>

        <div className="space-y-4">
          <div className="h-4 bg-stone-200 rounded w-full" />
          <div className="h-4 bg-stone-200 rounded w-full" />
          <div className="h-4 bg-stone-200 rounded w-5/6" />
          <div className="h-4 bg-stone-200 rounded w-full" />
          <div className="h-4 bg-stone-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}





