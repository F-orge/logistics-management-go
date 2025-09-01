export default function LoadingPage() {
  return (
    <article className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        {/* Heading skeleton */}
        <div className="h-9 w-48 bg-gray-200 rounded animate-pulse border-b pb-4">
        </div>
      </section>
      <section className="flex flex-row justify-end col-span-full">
        {/* Button skeleton */}
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </section>
      <section className="col-span-full">
        {/* Table skeleton */}
        <div className="space-y-4">
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 w-full bg-gray-100 rounded animate-pulse"
            >
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
