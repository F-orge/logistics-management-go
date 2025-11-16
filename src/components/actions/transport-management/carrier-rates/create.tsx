import { formOptions } from "@tanstack/react-form";
import {
	UseNavigateResult,
	useNavigate,
	useRouteContext,
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

export const CreateSchema = z.object({
	carrier: CarrierRatesSchema.shape.carrier.register(fieldRegistry, {
		id: "transport-management-carrier-rates-carrier-create",
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
	serviceType: CarrierRatesSchema.shape.serviceType.register(fieldRegistry, {
		id: "transport-management-carrier-rates-serviceType-create",
		type: "field",
		label: "ServiceType",
		description: "Enter a servicetype",
		inputType: "text",
	}),
	origin: CarrierRatesSchema.shape.origin.register(fieldRegistry, {
		id: "transport-management-carrier-rates-origin-create",
		type: "field",
		label: "Origin",
		description: "Enter an origin",
		inputType: "text",
	}),
	destination: CarrierRatesSchema.shape.destination.register(fieldRegistry, {
		id: "transport-management-carrier-rates-destination-create",
		type: "field",
		label: "Destination",
		description: "Enter a destination",
		inputType: "text",
	}),
	rate: CarrierRatesSchema.shape.rate.register(fieldRegistry, {
		id: "transport-management-carrier-rates-rate-create",
		type: "field",
		label: "Rate",
		description: "Enter a rate",
		inputType: "number",
	}),
	unit: CarrierRatesSchema.shape.unit.register(fieldRegistry, {
		id: "transport-management-carrier-rates-unit-create",
		type: "field",
		label: "Unit",
		description: "Enter an unit",
		inputType: "text",
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateSchema>,
	validators: {
		onSubmit: CreateSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta.pocketbase
				.collection(Collections.TransportManagementCarrierRates)
				.create(value);
			toast.success("Carrier rate created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create carrier rate: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateForm = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm(FormOption);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit({ navigate, pocketbase });
			}}
		>
			<form.AppForm>
				<AutoFieldSet
					form={form as any}
					{...toAutoFormFieldSet(CreateSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Item</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateForm;
