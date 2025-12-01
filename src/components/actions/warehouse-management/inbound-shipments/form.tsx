import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React from "react";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { withForm } from "@/components/ui/forms";
import {
	Collections,
	CustomerRelationsCompaniesResponse,
	TypedPocketBase,
	WarehouseManagementInboundShipmentsRecord,
	WarehouseManagementSuppliersResponse,
	WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import {
	CreateInboundShipmentsSchema,
	InboundShipmentsSchema,
	UpdateInboundShipmentsSchema,
} from "@/pocketbase/schemas/warehouse-management/inbound-shipments";
import { InboundShipmentItemsForm } from "../inbound-shipment-items/form";

export type InboundShipmentsFormProps = {
	action?: "create" | "edit";
};

export const InboundShipmentsForm = withForm({
	defaultValues: {} as z.infer<typeof InboundShipmentsSchema>,
	props: {} as InboundShipmentsFormProps,
	render: ({ form, ...props }) => {
		return (
			<form.FieldSet
				fieldGroupProps={{
					className: "grid grid-cols-4 gap-4",
				}}
			>
				{/* client - string (relation) */}
				<form.AppField name="client">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Client"
							description="Client sending shipment"
						>
							<field.RelationField<CustomerRelationsCompaniesResponse>
								collectionName={Collections.CustomerRelationsCompanies}
								relationshipName="client"
								renderOption={(item) => item.name}
								disabled={props.action === "edit"}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* warehouse - string (relation) */}
				<form.AppField name="warehouse">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Warehouse"
							description="Receiving warehouse"
						>
							<field.RelationField<WarehouseManagementWarehousesResponse>
								collectionName={Collections.WarehouseManagementWarehouses}
								relationshipName="warehouse"
								renderOption={(item) => item.name}
								disabled={props.action === "edit"}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* status - enum */}
				<form.AppField name="status">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Status"
							description="Shipment status"
						>
							<field.SelectField
								options={[
									{ value: "pending", label: "Pending" },
									{ value: "arrived", label: "Arrived" },
									{ value: "processing", label: "Processing" },
									{ value: "completed", label: "Completed" },
									{ value: "cancelled", label: "Cancelled" },
								]}
							/>
						</field.Field>
					)}
				</form.AppField>
				{/* expectedArrivalDate - date */}
				<form.AppField name="expectedArrivalDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Expected Arrival"
							description="Expected arrival date"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* actualArrivalDate - date */}
				<form.AppField name="actualArrivalDate">
					{(field) => (
						<field.Field
							className="col-span-2"
							label="Actual Arrival"
							description="Actual arrival date"
						>
							<field.DateTimeField />
						</field.Field>
					)}
				</form.AppField>
				{/* items */}
				{props.action === "create" && (
					<>
						<FieldSeparator className="col-span-full" />
						<form.FieldSet
							className="col-span-full"
							legend="Inbound Shipment Items"
							description="Add line items to this shipment."
						>
							<form.AppField name="items" mode="array">
								{(field) => (
									<>
										{field.state.value?.map((_, index) => (
											<React.Fragment key={index}>
												<InboundShipmentItemsForm
													key={index}
													form={form}
													fields={`items[${index}]` as any}
													onRemove={() => field.removeValue(index)}
												/>
												<FieldSeparator className="col-span-full" />
											</React.Fragment>
										))}
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => field.pushValue(undefined as any)}
										>
											Add Item
										</Button>
									</>
								)}
							</form.AppField>
						</form.FieldSet>
					</>
				)}
			</form.FieldSet>
		);
	},
});

export const CreateInboundShipmentsFormOption = (pocketbase: TypedPocketBase) =>
	formOptions({
		defaultValues: {
			supplier: undefined,
			warehouse: undefined,
			status: undefined,
			expectedArrivalDate: undefined,
			actualArrivalDate: undefined,
		} as Partial<z.infer<ReturnType<typeof CreateInboundShipmentsSchema>>>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInboundShipments)
					.create(value);

				toast.success("Inbound shipment created successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });
					toast.error(
						`Failed to create shipment: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});

export const UpdateInboundShipmentsFormOption = (
	pocketbase: TypedPocketBase,
	record?: WarehouseManagementInboundShipmentsRecord,
) =>
	formOptions({
		defaultValues: record as Partial<
			z.infer<ReturnType<typeof UpdateInboundShipmentsSchema>>
		>,
		onSubmitMeta: {} as {
			navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
		},
		onSubmit: async ({ value, meta, formApi }) => {
			try {
				await pocketbase
					.collection(Collections.WarehouseManagementInboundShipments)
					.update(record?.id!, value);

				toast.success("Inbound shipment updated successfully!");
				meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
			} catch (error) {
				if (error instanceof ClientResponseError) {
					formApi.setErrorMap({ onSubmit: { fields: error.data.data } });
					toast.error(
						`Failed to update shipment: ${error.message} (${error.status})`,
					);
				}
			}
		},
	});
