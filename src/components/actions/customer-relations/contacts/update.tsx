import { useQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useParams,
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
import { Collections, Update } from "@/lib/pb.types";

const UpdateContactFormDialog = () => {
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });

	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const { data: record } = useQuery({
		queryKey: [Collections.CustomerRelationsContacts, searchParams.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.CustomerRelationsContacts)
				.getOne(searchParams.id || ""),
		enabled: !!searchParams.id,
	});

	const form = useAppForm({
		defaultValues: (record ||
			{}) as Update<Collections.CustomerRelationsContacts>,
		onSubmit: async ({ value }) => {
			try {
				await pocketbase
					.collection(Collections.CustomerRelationsContacts)
					.update(searchParams.id || "", value);

				navigate({
					search: (prev) => ({
						...prev,
						action: undefined,
						id: undefined,
					}),
				});

				toast.success("Contact updated successfully");
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
				open={searchParams.action === "updateContact"}
				onOpenChange={() =>
					navigate({
						search: (prev) => ({ ...prev, action: undefined, id: undefined }),
					})
				}
				title="Update Contact"
				description="Stores customer contact information including name, email, phone, job title, and company association"
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
									description="Full name of the contact"
									tooltip="e.g., 'John Doe', 'Jane Smith'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="email">
							{(field) => (
								<field.EmailField
									label="Email"
									description="Email address"
									tooltip="e.g., 'john@company.com', 'jane@business.com'"
									placeholder="example@email.com"
								/>
							)}
						</form.AppField>
						<form.AppField name="jobTitle">
							{(field) => (
								<field.TextField
									label="Job Title"
									description="Job title or position"
									tooltip="e.g., 'Sales Manager', 'Operations Director'"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="phoneNumber">
							{(field) => (
								<field.TextField
									label="Phone Number"
									description="Contact phone number"
									tooltip="e.g., '+63 9123456789', '02-1234-5678'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Relationships</FieldSeparator>

					{/* Relationships */}
					<FieldGroup>
						<FieldLegend>Relationships</FieldLegend>
						<FieldDescription>
							Manage relationships information
						</FieldDescription>

						<form.AppField name="company">
							{(field) => (
								<field.TextField
									label="Company"
									description="Associated company or organization"
									tooltip="e.g., 'ABC Company', 'XYZ Corporation'"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator>Assignment</FieldSeparator>

					{/* Assignment */}
					<FieldGroup>
						<FieldLegend>Assignment</FieldLegend>
						<FieldDescription>Manage assignment information</FieldDescription>

						<form.AppField name="owner">
							{(field) => (
								<field.TextField
									label="Owner"
									description="Account manager assigned to this contact"
									tooltip="e.g., 'John Account', 'account-mgr@company.com'"
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

export default UpdateContactFormDialog;
