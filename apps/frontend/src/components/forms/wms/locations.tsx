import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateLocationInputSchema,
  UpdateLocationInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createLocationSchema = CreateLocationInputSchema();
export const updateLocationSchema = UpdateLocationInputSchema();

export const createLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createLocationSchema>,
});

export const updateLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateLocationSchema>,
});

export const CreateLocationForm = withForm({
  ...createLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Location</FieldLegend>
        <FieldDescription>Create a new warehouse storage location.</FieldDescription>
        <FieldGroup>
          {/* Location Hierarchy Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Hierarchy</FieldLegend>
            <FieldDescription>Define location in warehouse structure.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.InputField
                      label="Warehouse *"
                      description="Parent warehouse for this location."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="parentLocationId">
                  {(field) => (
                    <field.InputField
                      label="Parent Location"
                      description="Parent location in hierarchy (if nested)."
                      placeholder="Location ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="level">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Level *"
                      description="Hierarchical level in warehouse."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="path">
                  {(field) => (
                    <field.InputField
                      label="Path"
                      description="Full hierarchical path (e.g., A-01-01-1)."
                      placeholder="A-01-01-1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Location Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Identification</FieldLegend>
            <FieldDescription>Name, type, and barcode for location.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="name">
                  {(field) => (
                    <field.InputField
                      label="Name *"
                      description="Location name or identifier."
                      placeholder="e.g., Aisle-Shelf-Bin"
                    />
                  )}
                </form.AppField>
                <form.AppField name="barcode">
                  {(field) => (
                    <field.InputField
                      label="Barcode"
                      description="Barcode for scanning."
                      placeholder="e.g., SKU-A-01-01"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type *"
                    description="Location type (shelf, bin, pallet, etc)."
                    placeholder="e.g., Shelf, Bin, Floor"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Capacity Section */}
          <FieldSet>
            <FieldLegend variant="label">Capacity Limits</FieldLegend>
            <FieldDescription>Storage capacity constraints.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="maxWeight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Weight"
                      description="Maximum weight capacity (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxVolume">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Volume"
                      description="Maximum volume capacity (m³)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="maxPallets">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Max Pallets"
                    description="Maximum number of pallets."
                    placeholder="0"
                    step="1"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Coordinates Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Coordinates</FieldLegend>
            <FieldDescription>Physical position in warehouse.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="xCoordinate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="X Coordinate"
                      description="X-axis position."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="yCoordinate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Y Coordinate"
                      description="Y-axis position."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="zCoordinate">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Z Coordinate"
                    description="Z-axis position (height)."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Operations Flags Section */}
          <FieldSet>
            <FieldLegend variant="label">Operations Flags</FieldLegend>
            <FieldDescription>Location capabilities and restrictions.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="isPickable">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Pickable"
                      description="Can items be picked from this location."
                    />
                  )}
                </form.AppField>
                <form.AppField name="isReceivable">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Receivable"
                      description="Can items be received at this location."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="temperatureControlled">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Temperature Controlled"
                      description="Location has temperature control."
                    />
                  )}
                </form.AppField>
                <form.AppField name="hazmatApproved">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Hazmat Approved"
                      description="Can store hazardous materials."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="isActive">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Active"
                    description="Location is active and available."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateLocationForm = withForm({
  ...updateLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Location</FieldLegend>
        <FieldDescription>Update warehouse storage location details.</FieldDescription>
        <FieldGroup>
          {/* Location Hierarchy Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Hierarchy</FieldLegend>
            <FieldDescription>Update location in warehouse structure.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.InputField
                      label="Warehouse"
                      description="Parent warehouse for this location."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="parentLocationId">
                  {(field) => (
                    <field.InputField
                      label="Parent Location"
                      description="Parent location in hierarchy (if nested)."
                      placeholder="Location ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="level">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Level"
                      description="Hierarchical level in warehouse."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="path">
                  {(field) => (
                    <field.InputField
                      label="Path"
                      description="Full hierarchical path (e.g., A-01-01-1)."
                      placeholder="A-01-01-1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Location Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Identification</FieldLegend>
            <FieldDescription>Update name, type, and barcode.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="name">
                  {(field) => (
                    <field.InputField
                      label="Name"
                      description="Location name or identifier."
                      placeholder="e.g., Aisle-Shelf-Bin"
                    />
                  )}
                </form.AppField>
                <form.AppField name="barcode">
                  {(field) => (
                    <field.InputField
                      label="Barcode"
                      description="Barcode for scanning."
                      placeholder="e.g., SKU-A-01-01"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type"
                    description="Location type (shelf, bin, pallet, etc)."
                    placeholder="e.g., Shelf, Bin, Floor"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Capacity Section */}
          <FieldSet>
            <FieldLegend variant="label">Capacity Limits</FieldLegend>
            <FieldDescription>Update storage capacity constraints.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="maxWeight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Weight"
                      description="Maximum weight capacity (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxVolume">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Volume"
                      description="Maximum volume capacity (m³)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="maxPallets">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Max Pallets"
                    description="Maximum number of pallets."
                    placeholder="0"
                    step="1"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Coordinates Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Coordinates</FieldLegend>
            <FieldDescription>Update physical position in warehouse.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="xCoordinate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="X Coordinate"
                      description="X-axis position."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="yCoordinate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Y Coordinate"
                      description="Y-axis position."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="zCoordinate">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Z Coordinate"
                    description="Z-axis position (height)."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Operations Flags Section */}
          <FieldSet>
            <FieldLegend variant="label">Operations Flags</FieldLegend>
            <FieldDescription>Update location capabilities and restrictions.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="isPickable">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Pickable"
                      description="Can items be picked from this location."
                    />
                  )}
                </form.AppField>
                <form.AppField name="isReceivable">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Receivable"
                      description="Can items be received at this location."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="temperatureControlled">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Temperature Controlled"
                      description="Location has temperature control."
                    />
                  )}
                </form.AppField>
                <form.AppField name="hazmatApproved">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Hazmat Approved"
                      description="Can store hazardous materials."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="isActive">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Active"
                    description="Location is active and available."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
