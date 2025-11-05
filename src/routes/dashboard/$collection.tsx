import { createFileRoute, notFound } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";

export const Route = createFileRoute("/dashboard/$collection")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		try {
			// todo: convert kebab case to camel case

			const result = await context.pocketbase
				.collection(params.collection)
				.getList(1, 10);

			return { data: result };
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
	const { data } = Route.useLoaderData();

	return <div>{JSON.stringify(data)}</div>;
}
