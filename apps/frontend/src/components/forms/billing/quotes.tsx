import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateQuoteInputSchema,
  UpdateQuoteInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createQuoteSchema = CreateQuoteInputSchema();
export const updateQuoteSchema = UpdateQuoteInputSchema();

export const createQuoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createQuoteSchema>,
});

export const updateQuoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateQuoteSchema>,
});

export const CreateQuoteForm = withForm({
  ...createQuoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Quote</FieldLegend>
        <FieldDescription>Create a service quote.</FieldDescription>
        <FieldGroup>
          {/* Quote Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Quote Identification</FieldLegend>
            <FieldDescription>Quote number and basic information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quoteNumber">
                  {(field) => (
                    <field.InputField
                      label="Quote Number *"
                      description="Unique quote identifier."
                      placeholder="e.g., QUOTE-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Quote status."
                      placeholder="e.g., Draft, Pending, Accepted"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Client & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Client & Relations</FieldLegend>
            <FieldDescription>Client information and created by user.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client *"
                      description="Client for this quote."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="createdByUserId">
                  {(field) => (
                    <field.InputField
                      label="Created By"
                      description="User who created quote."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Route Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Details</FieldLegend>
            <FieldDescription>Origin and destination information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="originDetails">
                {(field) => (
                  <field.InputField
                    label="Origin Details *"
                    description="Pickup location information."
                    placeholder="Full address or location details"
                  />
                )}
              </form.AppField>
              <form.AppField name="destinationDetails">
                {(field) => (
                  <field.InputField
                    label="Destination Details *"
                    description="Delivery location information."
                    placeholder="Full address or location details"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Dimensions & Weight Section */}
          <FieldSet>
            <FieldLegend variant="label">Dimensions & Weight</FieldLegend>
            <FieldDescription>Shipment dimensions and weight.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="weight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight (kg) *"
                      description="Shipment weight in kilograms."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="length">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Length (m) *"
                      description="Length in meters."
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
                      label="Width (m) *"
                      description="Width in meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="height">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Height (m) *"
                      description="Height in meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Pricing & Service Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing & Service</FieldLegend>
            <FieldDescription>Quote pricing and service level.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quotedPrice">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quoted Price *"
                      description="Quote amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="serviceLevel">
                  {(field) => (
                    <field.InputField
                      label="Service Level *"
                      description="Service level offered."
                      placeholder="e.g., Standard, Express, Overnight"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Expiry & Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Expiry & Notes</FieldLegend>
            <FieldDescription>Quote expiry and additional notes.</FieldDescription>
            <FieldGroup>
              <form.AppField name="expiresAt">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Expires At"
                    description="When this quote expires."
                    placeholder="YYYY-MM-DDTHH:mm"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes or conditions."
                    placeholder="Enter notes..."
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

export const UpdateQuoteForm = withForm({
  ...updateQuoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Quote</FieldLegend>
        <FieldDescription>Update quote details.</FieldDescription>
        <FieldGroup>
          {/* Quote Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Quote Identification</FieldLegend>
            <FieldDescription>Update quote number and status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quoteNumber">
                  {(field) => (
                    <field.InputField
                      label="Quote Number"
                      description="Quote identifier."
                      placeholder="e.g., QUOTE-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Quote status."
                      placeholder="e.g., Draft, Pending, Accepted"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Client & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Client & Relations</FieldLegend>
            <FieldDescription>Update client information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client"
                      description="Client for quote."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="createdByUserId">
                  {(field) => (
                    <field.InputField
                      label="Created By"
                      description="User who created quote."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Route Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Details</FieldLegend>
            <FieldDescription>Update origin and destination.</FieldDescription>
            <FieldGroup>
              <form.AppField name="originDetails">
                {(field) => (
                  <field.InputField
                    label="Origin Details"
                    description="Pickup location."
                    placeholder="Full address"
                  />
                )}
              </form.AppField>
              <form.AppField name="destinationDetails">
                {(field) => (
                  <field.InputField
                    label="Destination Details"
                    description="Delivery location."
                    placeholder="Full address"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Dimensions & Weight Section */}
          <FieldSet>
            <FieldLegend variant="label">Dimensions & Weight</FieldLegend>
            <FieldDescription>Update shipment dimensions.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="weight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight (kg)"
                      description="Weight in kilograms."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="length">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Length (m)"
                      description="Length in meters."
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
                      label="Width (m)"
                      description="Width in meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="height">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Height (m)"
                      description="Height in meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Pricing & Service Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing & Service</FieldLegend>
            <FieldDescription>Update pricing and service level.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quotedPrice">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quoted Price"
                      description="Quote amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="serviceLevel">
                  {(field) => (
                    <field.InputField
                      label="Service Level"
                      description="Service level."
                      placeholder="e.g., Standard, Express"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Expiry & Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Expiry & Notes</FieldLegend>
            <FieldDescription>Update expiry and notes.</FieldDescription>
            <FieldGroup>
              <form.AppField name="expiresAt">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Expires At"
                    description="When quote expires."
                    placeholder="YYYY-MM-DDTHH:mm"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes."
                    placeholder="Enter notes..."
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
