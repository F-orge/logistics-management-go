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
import { CarrierRatesSchema } from "@/pocketbase/schemas/transport-management/carrier-rates";
import { CreateSchema } from "./create";

export const UpdateSchema = z.object({
	carrier: CarrierRatesSchema.shape.carrier.optional().register(fieldRegistry, {
		id: "transport-management-carrier-rates-carrier-update",
		type: "field",
		label: "Carrier",
		description: "Enter a carrier",
		inputType: "relation",
		props: {
			collectionName: Collections.TransportManagementCarriers,
			displayField: "name",
			relationshipName: "carrier",
		},
	}),
	serviceType: CarrierRatesSchema.shape.serviceType
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-carrier-rates-serviceType-update",
			type: "field",
			label: "ServiceType",
			description: "Enter a servicetype",
			inputType: "text",
		}),
	origin: CarrierRatesSchema.shape.origin.optional().register(fieldRegistry, {
		id: "transport-management-carrier-rates-origin-update",
		type: "field",
		label: "Origin",
		description: "Enter an origin",
		inputType: "text",
	}),
	destination: CarrierRatesSchema.shape.destination
		.optional()
		.register(fieldRegistry, {
			id: "transport-management-carrier-rates-destination-update",
			type: "field",
			label: "Destination",
			description: "Enter a destination",
			inputType: "text",
		}),
	rate: CarrierRatesSchema.shape.rate.optional().register(fieldRegistry, {
		id: "transport-management-carrier-rates-rate-update",
		type: "field",
		label: "Rate",
		description: "Enter a rate",
		inputType: "number",
	}),
	unit: CarrierRatesSchema.shape.unit.optional().register(fieldRegistry, {
		id: "transport-management-carrier-rates-unit-update",
		type: "field",
		label: "Unit",
		description: "Enter an unit",
		inputType: "text",
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
				.pocketbase!.collection(Collections.TransportManagementCarrierRates)
				.update(meta.id!, value);

			toast.success("Carrier rate updated successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to update carrier rate: ${error.message} (${error.status})`,
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
		queryKey: ["carrier-rates", searchQuery.id],

		queryFn: async () => {
			const record = await pocketbase
				.collection(Collections.TransportManagementCarrierRates)
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
					<form.SubmitButton>Update Carrier Rate</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default UpdateForm;
