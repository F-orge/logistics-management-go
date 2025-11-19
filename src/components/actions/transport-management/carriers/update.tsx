import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {
	fieldRegistry,
	toAutoFormFieldSet,
} from "@/components/ui/autoform-tanstack/types";
import { DialogFooter } from "@/components/ui/dialog";
import { useAppForm } from "@/components/ui/forms";
import { Collections, TypedPocketBase } from "@/lib/pb.types";
import { CarriersSchema } from "@/pocketbase/schemas/transport-management/carriers";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	name: CarriersSchema.shape.name.optional().register(fieldRegistry, {
		id: "transport-management-carriers-name-update",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	contactDetails: CarriersSchema.shape.contactDetails
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-carriers-contactDetails-update",
			type: "field",
			label: "ContactDetails",
			description: "Enter contact details",
			inputType: "textarea",
		}),
	serviceOffered: CarriersSchema.shape.serviceOffered
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-carriers-serviceOffered-update",
			type: "field",
			label: "ServiceOffered",
			description: "Enter services offered",
			inputType: "textarea",
		}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof UpdateSchema>,
	validators: {
		onSubmit: UpdateSchema,
	},
	onSubmitMeta: {} as {
		id: string;
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.TransportManagementCarriers)
				.update(meta.id!, value);

			toast.success("Carrier updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update carrier: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({
				search: (prev) => ({ ...prev, action: undefined, id: undefined }),
			});
		}
	},
});

const UpdateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data } = useSuspenseQuery({
		queryKey: ["carriers", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementCarriers)
				.getOne(searchQuery.id!);
			return record;
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: data as z.infer<typeof UpdateSchema>,
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase, id: searchQuery.id! });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Carrier</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
