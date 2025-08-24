import { createFileRoute } from "@tanstack/react-router";
import LoadingPage from "./-loading";
import { pb } from "@/pocketbase";

export const Route = createFileRoute("/dashboard/crm/leads/")({
  component: RouteComponent,
  pendingComponent: LoadingPage,
  loader: () => pb.collection("crm_leads").getList(0, 10),
});

function RouteComponent() {
  return (
    <article>
      <section>
        {/* Heading */}
        <h1 className="text-3xl font-medium border-b pb-4">Leads</h1>
      </section>
      <section>
        {/* Key statistics */}
      </section>
      <section>
        {/* Table */}
      </section>
      <section>
        {/* Action dialogs */}
      </section>
    </article>
  );
}
