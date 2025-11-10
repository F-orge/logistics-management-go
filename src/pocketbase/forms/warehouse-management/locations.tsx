import { formOptions } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	useNavigate,
	useRouteContext,
	useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import {
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
	Collections,
	Create,
	TypedPocketBase,
	Update,
	WarehouseManagementLocationsRecord,
	WarehouseManagementLocationsResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import { WarehouseManagementLocationsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementLocationsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.WarehouseManagementLocations>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementLocations)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `Locations created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementLocationsRecord,
) =>
	formOptions({
		defaultValues: record as Update<Collections.WarehouseManagementLocations>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementLocations)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "Locations updated successfully",
				})
				.unwrap();
		},
	});

export const LocationsForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementLocations>
		| Update<Collections.WarehouseManagementLocations>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
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
									description="Location identifier or bin code"
									placeholder=""
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Association */}
					<FieldGroup>
						<FieldLegend>Association</FieldLegend>
						<FieldDescription>Manage association information</FieldDescription>

						<form.AppField name="warehouse">
							{(field) => (
								<field.RelationField<WarehouseManagementWarehousesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementWarehouses}
									relationshipName="warehouse"
									label="Warehouse"
									description="Parent warehouse for this location"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Classification */}
					<FieldGroup>
						<FieldLegend>Classification</FieldLegend>
						<FieldDescription>
							Manage classification information
						</FieldDescription>

						<form.AppField name="type">
							{(field) => (
								<field.SelectField
									label="Type"
									description="Category of this location"
									options={[
										{ label: "Receiving-dock", value: "receiving-dock" },
										{ label: "Pick-bin", value: "pick-bin" },
										{ label: "Packing-station", value: "packing-station" },
										{ label: "Cross-dock-area", value: "cross-dock-area" },
										{ label: "Bulk-storage", value: "bulk-storage" },
										{ label: "Reserve-storage", value: "reserve-storage" },
										{ label: "Damaged-goods", value: "damaged-goods" },
										{ label: "Staging-area", value: "staging-area" },
										{ label: "Quality-control", value: "quality-control" },
										{ label: "Returns-area", value: "returns-area" },
									]}
									placeholder="Select..."
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Identification */}
					<FieldGroup>
						<FieldLegend>Identification</FieldLegend>
						<FieldDescription>
							Manage identification information
						</FieldDescription>

						<form.AppField name="barcode">
							{(field) => (
								<field.TextField
									label="Barcode"
									description="Barcode for location tracking"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Physical Layout */}
					<FieldGroup>
						<FieldLegend>Physical Layout</FieldLegend>
						<FieldDescription>
							Manage physical layout information
						</FieldDescription>

						<form.AppField name="level">
							{(field) => (
								<field.NumberField
									label="Level"
									description="Warehouse level or floor number"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Capacity */}
					<FieldGroup>
						<FieldLegend>Capacity</FieldLegend>
						<FieldDescription>Manage capacity information</FieldDescription>

						<form.AppField name="maxWeight">
							{(field) => (
								<field.NumberField
									label="Max Weight"
									description="Maximum weight capacity in kg"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxVolume">
							{(field) => (
								<field.NumberField
									label="Max Volume"
									description="Maximum volume capacity in cubic meters"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
						<form.AppField name="maxPallets">
							{(field) => (
								<field.NumberField
									label="Max Pallets"
									description="Maximum number of pallets this location can hold"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Environmental */}
					<FieldGroup>
						<FieldLegend>Environmental</FieldLegend>
						<FieldDescription>
							Manage environmental information
						</FieldDescription>

						<form.AppField name="temperatureControlled">
							{(field) => (
								<field.TextField
									label="Temperature Controlled"
									description="Whether this location has temperature control"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="hazmatApproved">
							{(field) => (
								<field.TextField
									label="Hazmat Approved"
									description="Whether this location is approved for hazardous materials"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Status */}
					<FieldGroup>
						<FieldLegend>Status</FieldLegend>
						<FieldDescription>Manage status information</FieldDescription>

						<form.AppField name="isActive">
							{(field) => (
								<field.TextField
									label="Is Active"
									description="Whether this location is available for use"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Operations */}
					<FieldGroup>
						<FieldLegend>Operations</FieldLegend>
						<FieldDescription>Manage operations information</FieldDescription>

						<form.AppField name="isPickable">
							{(field) => (
								<field.TextField
									label="Is Pickable"
									description="Whether orders can be picked from this location"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="isReceivable">
							{(field) => (
								<field.TextField
									label="Is Receivable"
									description="Whether items can be received into this location"
									placeholder=""
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Hierarchy */}
					<FieldGroup>
						<FieldLegend>Hierarchy</FieldLegend>
						<FieldDescription>Manage hierarchy information</FieldDescription>

						<form.AppField name="parentLocation">
							{(field) => (
								<field.RelationField<WarehouseManagementLocationsResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementLocations}
									relationshipName="parentLocation"
									label="Parent Location"
									description="Parent location if this is a sub-location"
									displayField="name"
									recordListOption={{}}
								/>
							)}
						</form.AppField>
					</FieldGroup>
				</FieldSet>
			</form.AppForm>
		);
	},
});

const CreateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const form = useAppForm(CreateFormOptionFactory(pocketbase));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "create"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<LocationsForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

const UpdateForm = () => {
	const { pocketbase } = useRouteContext({
		from: "/dashboard/$schema/$collection",
	});

	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	const { data: record } = useSuspenseQuery({
		queryKey: ["locations", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementLocations)
				.getOne<WarehouseManagementLocationsRecord>(searchQuery.id!),
	});

	const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

	return (
		<form.AppForm>
			<FormDialog
				open={searchQuery.action === "update"}
				onOpenChange={() =>
					navigate({ search: (prev) => ({ ...prev, action: undefined }) })
				}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				onClear={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				<LocationsForm form={form as any} />
			</FormDialog>
		</form.AppForm>
	);
};

export default () => {
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

	switch (searchQuery.action) {
		case "create":
			return <CreateForm />;
		case "update":
			return <UpdateForm />;
		default:
			return null;
	}
};
