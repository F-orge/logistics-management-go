import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React from "react";
import { toast } from "sonner";
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { useAppForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import { Collections, Create } from "@/lib/pb.types";

const CreateSupplierFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const form = useAppForm({
		defaultValues: {} as Create<Collections.WarehouseManagementSuppliers>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementSuppliers)
					.create(value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
					}),
				});

				toast.success("Supplier created successfully");
			} catch (error) {
				if (error instanceof ClientResponseError) {
					toast.error(error.message);
				}
			}
		},
	});

	return (
		<form.AppForm>
			<FormDialog
				open={searchParams.action === "createSupplier"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				title="Create Supplier"
				description="Records supplier information including contact details and optional client associations for procurement"
			>
				<FieldSet>
					{/* Basic Information */}
					<FieldGroup>
						<FieldLegend>Basic Information</FieldLegend>
						<FieldDescription>
							Manage basic information information
						</FieldDescription>

						<form.AppField name="name">
							{(field) => (
								<field.TextField
									label="Name"
									description="Supplier company name"
									tooltip="e.g., 'ABC Supplier Corp', 'XYZ Trading'"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Contact</FieldSeparator>

					{/* Contact */}
					<FieldGroup>
						<FieldLegend>Contact</FieldLegend>
						<FieldDescription>Manage contact information</FieldDescription>

						<form.AppField name="contactPerson">
							{(field) => (
								<field.TextField
									label="Contact Person"
									description="Name of main contact person"
									tooltip="e.g., 'John Smith', 'Maria Garcia'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="email">
							{(field) => (
								<field.EmailField
									label="Email"
									description="Email address for communication"
									tooltip="e.g., 'contact@supplier.com'"
									placeholder="example@email.com"
								/>
							)}
						</form.AppField>
						<form.AppField name="phoneNumber">
							{(field) => (
								<field.TextField
									label="Phone Number"
									description="Phone number for contact"
									tooltip="e.g., '+63 2 1234 5678'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Reference</FieldSeparator>

					{/* Reference */}
					<FieldGroup>
						<FieldLegend>Reference</FieldLegend>
						<FieldDescription>Manage reference information</FieldDescription>

						<form.AppField name="client">
							{(field) => (
								<field.TextField
									label="Client"
									description="Associated client (optional)"
									tooltip="e.g., 'CLI-001', 'ABC Company'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</FormDialog>
		</form.AppForm>
	);
};

export default CreateSupplierFormDialog;
