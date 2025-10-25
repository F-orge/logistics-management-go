import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePackageInputSchema,
  UpdatePackageInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPackageSchema = CreatePackageInputSchema();
export const updatePackageSchema = UpdatePackageInputSchema();

export const createPackageFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPackageSchema>,
});

export const updatePackageFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePackageSchema>,
});

export const CreatePackageForm = withForm({
  ...createPackageFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Package</FieldLegend>
        <FieldDescription>Create a new package for shipment.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link package to sales order and warehouse.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.InputField
                      label="Sales Order *"
                      description="The sales order this package is for."
                      placeholder="Sales Order ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.InputField
                      label="Warehouse *"
                      description="Warehouse where package is prepared."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Package Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Package Information</FieldLegend>
            <FieldDescription>Package number, type, and identification.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="packageNumber">
                  {(field) => (
                    <field.InputField
                      label="Package Number *"
                      description="Unique package identifier."
                      placeholder="e.g., PKG-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="packageType">
                  {(field) => (
                    <field.InputField
                      label="Package Type *"
                      description="Type of package (box, envelope, etc)."
                      placeholder="e.g., Box, Envelope, Pallet"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Dimensions Section */}
          <FieldSet>
            <FieldLegend variant="label">Dimensions & Weight</FieldLegend>
            <FieldDescription>Physical dimensions and weight of package.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="weight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight *"
                      description="Total package weight (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="length">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Length *"
                      description="Package length (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="width">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Width *"
                      description="Package width (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="height">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Height *"
                      description="Package height (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Shipping Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Shipping Information</FieldLegend>
            <FieldDescription>Carrier, service level, and tracking details.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="trackingNumber">
                  {(field) => (
                    <field.InputField
                      label="Tracking Number"
                      description="Carrier tracking number."
                      placeholder="e.g., 1Z999AA10123456784"
                    />
                  )}
                </form.AppField>
                <form.AppField name="carrier">
                  {(field) => (
                    <field.InputField
                      label="Carrier"
                      description="Shipping carrier name."
                      placeholder="e.g., FedEx, UPS, DHL"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="serviceLevel">
                {(field) => (
                  <field.InputField
                    label="Service Level"
                    description="Shipping service level."
                    placeholder="e.g., Standard, Express, Overnight"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Packing Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Packing Details</FieldLegend>
            <FieldDescription>Who packed and when.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="packedByUserId">
                  {(field) => (
                    <field.InputField
                      label="Packed By"
                      description="User who packed the package."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="packedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Packed At"
                      description="When package was packed."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="shippedAt">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Shipped At"
                    description="When package was shipped."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Special Handling Section */}
          <FieldSet>
            <FieldLegend variant="label">Special Handling</FieldLegend>
            <FieldDescription>Package flags and insurance information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="isFragile">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Fragile"
                      description="Package contains fragile items."
                    />
                  )}
                </form.AppField>
                <form.AppField name="isHazmat">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Hazmat"
                      description="Package contains hazardous materials."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="requiresSignature">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Requires Signature"
                      description="Signature required upon delivery."
                    />
                  )}
                </form.AppField>
                <form.AppField name="insuranceValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Insurance Value"
                      description="Declared insurance value."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdatePackageForm = withForm({
  ...updatePackageFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Package</FieldLegend>
        <FieldDescription>Update package details.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update sales order and warehouse associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.InputField
                      label="Sales Order"
                      description="The sales order this package is for."
                      placeholder="Sales Order ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.InputField
                      label="Warehouse"
                      description="Warehouse where package is prepared."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Package Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Package Information</FieldLegend>
            <FieldDescription>Update package number and type.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="packageNumber">
                  {(field) => (
                    <field.InputField
                      label="Package Number"
                      description="Unique package identifier."
                      placeholder="e.g., PKG-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="packageType">
                  {(field) => (
                    <field.InputField
                      label="Package Type"
                      description="Type of package (box, envelope, etc)."
                      placeholder="e.g., Box, Envelope, Pallet"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Dimensions Section */}
          <FieldSet>
            <FieldLegend variant="label">Dimensions & Weight</FieldLegend>
            <FieldDescription>Update physical dimensions and weight.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="weight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight"
                      description="Total package weight (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="length">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Length"
                      description="Package length (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="width">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Width"
                      description="Package width (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="height">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Height"
                      description="Package height (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Shipping Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Shipping Information</FieldLegend>
            <FieldDescription>Update carrier and service level.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="trackingNumber">
                  {(field) => (
                    <field.InputField
                      label="Tracking Number"
                      description="Carrier tracking number."
                      placeholder="e.g., 1Z999AA10123456784"
                    />
                  )}
                </form.AppField>
                <form.AppField name="carrier">
                  {(field) => (
                    <field.InputField
                      label="Carrier"
                      description="Shipping carrier name."
                      placeholder="e.g., FedEx, UPS, DHL"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="serviceLevel">
                {(field) => (
                  <field.InputField
                    label="Service Level"
                    description="Shipping service level."
                    placeholder="e.g., Standard, Express, Overnight"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Packing Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Packing Details</FieldLegend>
            <FieldDescription>Update packing information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="packedByUserId">
                  {(field) => (
                    <field.InputField
                      label="Packed By"
                      description="User who packed the package."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="packedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Packed At"
                      description="When package was packed."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="shippedAt">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Shipped At"
                    description="When package was shipped."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Special Handling Section */}
          <FieldSet>
            <FieldLegend variant="label">Special Handling</FieldLegend>
            <FieldDescription>Update package flags and insurance.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="isFragile">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Fragile"
                      description="Package contains fragile items."
                    />
                  )}
                </form.AppField>
                <form.AppField name="isHazmat">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Hazmat"
                      description="Package contains hazardous materials."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="requiresSignature">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Requires Signature"
                      description="Signature required upon delivery."
                    />
                  )}
                </form.AppField>
                <form.AppField name="insuranceValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Insurance Value"
                      description="Declared insurance value."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
