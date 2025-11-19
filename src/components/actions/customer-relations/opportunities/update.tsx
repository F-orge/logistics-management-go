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
import { OpportunitiesSchema } from "@/pocketbase/schemas/customer-relations/opportunities";

export const UpdateSchema = z.object({
	name: OpportunitiesSchema.shape.name.optional().register(fieldRegistry, {
		id: "customer-relations-opportunities-name-update",
		type: "field",
		label: "Name",
		description: "Enter a name",
		inputType: "text",
	}),
	stage: OpportunitiesSchema.shape.stage.optional().register(fieldRegistry, {
		id: "customer-relations-opportunities-stage-update",
		type: "field",
		label: "Stage",
		description: "Enter a stage",
		inputType: "text",
	}),
	dealValue: OpportunitiesSchema.shape.dealValue
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-opportunities-dealValue-update",
			type: "field",
			label: "DealValue",
			description: "Enter a dealvalue",
			inputType: "number",
		}),
	probability: OpportunitiesSchema.shape.probability
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-opportunities-probability-update",
			type: "field",
			label: "Probability",
			description: "Enter a probability",
			inputType: "number",
		}),
	expectedCloseDate: OpportunitiesSchema.shape.expectedCloseDate
		.optional()
		.register(fieldRegistry, {
			id: "customer-relations-opportunities-expectedCloseDate-update",
			type: "field",
			label: "ExpectedCloseDate",
			description: "Enter an expectedclosedate",
			inputType: "date",
		}),
	lostReason: OpportunitiesSchema.shape.lostReason.register(fieldRegistry, {
		id: "customer-relations-opportunities-lostReason-update",
		type: "field",
		label: "LostReason",
		description: "Enter a lostreason",
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
				.pocketbase!.collection(Collections.CustomerRelationsOpportunities)
				.update(meta.id, value);

			toast.success("Opportunity updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update opportunity: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const UpdateOpportunitiesForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data } = useSuspenseQuery({
		queryKey: ["opportunity", searchQuery.id],

		queryFn: async () => {
			return await pocketbase
				.collection(Collections.CustomerRelationsOpportunities)
				.getOne(searchQuery.id!);
		},
	});

	const form = useAppForm({
		...FormOption,
		defaultValues: {
			...data,
			expectedCloseDate: data.expectedCloseDate
				? new Date(data.expectedCloseDate)
				: undefined,
		} as z.infer<typeof UpdateSchema>,
	});

	if (!data) return null;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ id: searchQuery.id!, navigate, pocketbase });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(UpdateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Update Opportunity</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateOpportunitiesForm;
