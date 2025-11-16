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
import { CompaniesSchema } from "@/pocketbase/schemas/customer-relations/companies";

export const CreateCompaniesSchema = z.object({
	name: CompaniesSchema.shape.name.register(fieldRegistry, {
		id: "crm-companies-name-create",
		type: "field",
		label: "Company Name",
		description: "Enter the company name",
		inputType: "text",
	}),
	street: CompaniesSchema.shape.street.register(fieldRegistry, {
		id: "crm-companies-street-create",
		type: "field",
		label: "Street",
		description: "Enter the street address (optional)",
		inputType: "text",
	}),
	city: CompaniesSchema.shape.city.register(fieldRegistry, {
		id: "crm-companies-city-create",
		type: "field",
		label: "City",
		description: "Enter the city (optional)",
		inputType: "text",
	}),
	state: CompaniesSchema.shape.state.register(fieldRegistry, {
		id: "crm-companies-state-create",
		type: "field",
		label: "State",
		description: "Enter the state (optional)",
		inputType: "text",
	}),
	postalCode: CompaniesSchema.shape.postalCode.register(fieldRegistry, {
		id: "crm-companies-postalCode-create",
		type: "field",
		label: "Postal Code",
		description: "Enter the postal code (optional)",
		inputType: "text",
	}),
	country: CompaniesSchema.shape.country.register(fieldRegistry, {
		id: "crm-companies-country-create",
		type: "field",
		label: "Country",
		description: "Enter the country (optional)",
		inputType: "text",
	}),
	phoneNumber: CompaniesSchema.shape.phoneNumber.register(fieldRegistry, {
		id: "crm-companies-phoneNumber-create",
		type: "field",
		label: "Phone Number",
		description: "Enter the phone number (optional)",
		inputType: "text",
	}),
	industry: CompaniesSchema.shape.industry.register(fieldRegistry, {
		id: "crm-companies-industry-create",
		type: "field",
		label: "Industry",
		description: "Enter the industry (optional)",
		inputType: "text",
	}),
	website: CompaniesSchema.shape.website.register(fieldRegistry, {
		id: "crm-companies-website-create",
		type: "field",
		label: "Website",
		description: "Enter the website URL (optional)",
		inputType: "url",
	}),
	annualRevenue: CompaniesSchema.shape.annualRevenue.register(fieldRegistry, {
		id: "crm-companies-annualRevenue-create",
		type: "field",
		label: "Annual Revenue",
		description: "Enter the annual revenue (optional)",
		inputType: "number",
	}),
	attachments: CompaniesSchema.shape.attachments.register(fieldRegistry, {
		id: "crm-companies-attachments-create",
		type: "field",
		inputType: "file",
		label: "Attachments",
		description: "Upload attachments (optional)",
		isArray: true,
	}),
});

const FormOption = formOptions({
	defaultValues: {} as z.infer<typeof CreateCompaniesSchema>,
	validators: {
		onSubmit: CreateCompaniesSchema,
	},
	onSubmitMeta: {} as {
		pocketbase: TypedPocketBase;
		navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
	},
	onSubmit: async ({ value, meta }) => {
		try {
			await meta
				.pocketbase!.collection(Collections.CustomerRelationsCompanies)
				.create(value);

			toast.success("Company created successfully!");
		} catch (error) {
			if (error instanceof ClientResponseError) {
				toast.error(
					`Failed to create company: ${error.message} (${error.status})`,
				);
			}
		} finally {
			meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
		}
	},
});

const CreateCompaniesForm = () => {
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
					{...toAutoFormFieldSet(CreateCompaniesSchema)}
				/>
				<DialogFooter>
					<form.SubmitButton>Create Company</form.SubmitButton>
				</DialogFooter>
			</form.AppForm>
		</form>
	);
};

export default CreateCompaniesForm;
