import type { RouteSectionProps } from "@solidjs/router";

const AuthLayout = (props: RouteSectionProps) => {
  return (
    <main class="h-screen max-h-screen grid grid-cols-3">
      <aside class="bg-secondary col-span-1 p-4">
        <div class="flex flex-row justify-between items-center">
          <img src="https://placehold.co/36x36" alt="" />
        </div>
      </aside>
      <article class="col-span-2 py-24">{props.children}</article>
    </main>
  );
};

export default AuthLayout;
