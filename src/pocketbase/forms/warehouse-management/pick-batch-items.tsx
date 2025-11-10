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
	WarehouseManagementPickBatchesResponse,
	WarehouseManagementPickBatchItemsRecord,
	WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";
import { WarehouseManagementPickBatchItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementPickBatchItemsSchema.omit({
	id: true,
	created: true,
	updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {} as Create<Collections.WarehouseManagementPickBatchItems>,
		validators: {
			onSubmit: MutationSchema,
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementPickBatchItems)
				.create(value);

			await toast
				.promise(resultPromise, {
					success: `PickBatchItems created successfully`,
				})
				.unwrap();
		},
	});

export const UpdateFormOptionFactory = (
	pocketbase: TypedPocketBase,
	record: WarehouseManagementPickBatchItemsRecord,
) =>
	formOptions({
		defaultValues:
			record as Update<Collections.WarehouseManagementPickBatchItems>,
		validators: {
			onSubmit: MutationSchema.partial(),
		},
		onSubmit: async ({ value }) => {
			const resultPromise = pocketbase
				.collection(Collections.WarehouseManagementPickBatchItems)
				.update(record.id, value);

			await toast
				.promise(resultPromise, {
					success: "PickBatchItems updated successfully",
				})
				.unwrap();
		},
	});

export const PickBatchItemsForm = withForm({
	defaultValues: {} as
		| Create<Collections.WarehouseManagementPickBatchItems>
		| Update<Collections.WarehouseManagementPickBatchItems>,
	render: ({ form }) => {
		const { pocketbase } = useRouteContext({
			from: "/dashboard/$schema/$collection",
		});

		return (
			<form.AppForm>
				<FieldSet>
					{/* Batch */}
					<FieldGroup>
						<FieldLegend>Batch</FieldLegend>
						<FieldDescription>Manage batch information</FieldDescription>

						<form.AppField name="pickBatch">
							{(field) => (
								<field.RelationField<WarehouseManagementPickBatchesResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementPickBatches}
									relationshipName="pickBatch"
									label="Pick Batch"
									description="Parent pick batch"
									displayField="batchNumber"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Order */}
					<FieldGroup>
						<FieldLegend>Order</FieldLegend>
						<FieldDescription>Manage order information</FieldDescription>

						<form.AppField name="salesOrder">
							{(field) => (
								<field.RelationField<WarehouseManagementSalesOrdersResponse>
									pocketbase={pocketbase}
									collectionName={Collections.WarehouseManagementSalesOrders}
									relationshipName="salesOrder"
									label="Sales Order"
									description="Associated sales order"
									displayField="orderNumber"
									recordListOption={{}}
									required
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Priority */}
					<FieldGroup>
						<FieldLegend>Priority</FieldLegend>
						<FieldDescription>Manage priority information</FieldDescription>

						<form.AppField name="orderPriority">
							{(field) => (
								<field.NumberField
									label="Order Priority"
									description="Order priority in batch"
									placeholder="0"
									min={0}
								/>
							)}
						</form.AppField>
					</FieldGroup>

					<FieldSeparator> </FieldSeparator>

					{/* Timing */}
					<FieldGroup>
						<FieldLegend>Timing</FieldLegend>
						<FieldDescription>Manage timing information</FieldDescription>

						<form.AppField name="estimatedPickTime">
							{(field) => (
								<field.DateTimeField
									label="Estimated Pick Time"
									description="Estimated pick time"
									placeholder=""
								/>
							)}
						</form.AppField>
						<form.AppField name="actualPickTime">
							{(field) => (
								<field.NumberField
									label="Actual Pick Time"
									description="Actual pick time in seconds"
									placeholder="0"
									min={0}
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
				<PickBatchItemsForm form={form as any} />
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
		queryKey: ["pickbatchitems", searchQuery.id],
		queryFn: () =>
			pocketbase
				.collection(Collections.WarehouseManagementPickBatchItems)
				.getOne<WarehouseManagementPickBatchItemsRecord>(searchQuery.id!),
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
				<PickBatchItemsForm form={form as any} />
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
