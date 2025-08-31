export default function LoadingPage() {
  return (
    <div className="grid grid-cols-12 gap-2.5">
      <section className="col-span-full">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
      </section>
      <section className="flex flex-row justify-end col-span-full">
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
      </section>
      <section className="col-span-full">
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </section>
    </div>
  );
}
