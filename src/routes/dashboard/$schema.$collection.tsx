import { createFileRoute, notFound } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { ClientResponseError } from "pocketbase";
import z from "zod";
import { DataTable } from "@/components/ui/data-table";

export const Route = createFileRoute("/dashboard/$schema/$collection")({
	component: RouteComponent,
	validateSearch: zodValidator(
		z.object({
			page: z.number().min(1).nonnegative().default(1).catch(1),
			perPage: z.number().min(10).nonnegative().max(100).catch(10),
			filter: z.string().optional(),
			sort: z.string().optional(),
			action: z.string().optional(),
			id: z.string().optional(),
		}),
	),
	beforeLoad: ({ search }) => ({ search }),
	loader: async ({ context, params }) => {
		try {
			const { default: columns } = await import(
				`../../components/tables/${params.schema}/${params.collection}.tsx`
			);

			const { default: actions } = await import(
				`../../components/actions/${params.schema}/${params.collection}`
			);

			const { default: ControlSection } = await import(
				`../../components/controls/${params.schema}/${params.collection}.tsx`
			);

			const collection = `${params.schema}-${params.collection}`.replaceAll(
				"-",
				"_",
			);

			const result = await context.pocketbase
				.collection(collection)
				.getList(context.search.page, context.search.perPage, {
					filter: context.search.filter,
					sort: `-created`,
				});

			return { data: result, columns, actions, ControlSection };
		} catch (error) {
			if (error instanceof ClientResponseError) {
				if (error.status === 404) {
					throw notFound();
				}
			}
			throw error;
		}
	},
});

function RouteComponent() {
	const { data, columns, actions, ControlSection } = Route.useLoaderData();

	return (
		<article className="grid grid-cols-12 gap-5">
			<section>{/* analytics section */}</section>
			{ControlSection && <ControlSection />}
			<section className="col-span-full">
				<DataTable columns={columns} data={data} />
			</section>
			<section>{actions}</section>
		</article>
	);
}
