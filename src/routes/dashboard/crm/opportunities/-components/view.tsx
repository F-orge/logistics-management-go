import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';

const ViewOpportunityFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/opportunities' });
  const searchQuery = useSearch({ from: '/dashboard/crm/opportunities/' });
  const { dataTable } = useLoaderData({
    from: '/dashboard/crm/opportunities/',
  });
  const data = dataTable.find((row) => row.id === searchQuery.id);

  if (!data) {
    return <></>;
  }

  return (
    <Dialog
      open={searchQuery.view && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, view: undefined, id: undefined }),
        })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Opportunity Details</DialogTitle>
          <DialogDescription>
            Detailed information about {data.name}.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <div className="grid gap-4 py-4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>
                Fundamental details about the opportunity.
              </FieldDescription>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel>ID</FieldLabel>
                  <FieldDescription>{data.id}</FieldDescription>
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel>Name</FieldLabel>
                  <FieldDescription>{data.name}</FieldDescription>
                </Field>
                {data.ownerId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Owner ID</FieldLabel>
                    <FieldDescription>{data.ownerId}</FieldDescription>
                  </Field>
                )}
                {data.campaignId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Campaign ID</FieldLabel>
                    <FieldDescription>{data.campaignId}</FieldDescription>
                  </Field>
                )}
                {data.companyId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Company ID</FieldLabel>
                    <FieldDescription>{data.companyId}</FieldDescription>
                  </Field>
                )}
                {data.contactId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Contact ID</FieldLabel>
                    <FieldDescription>{data.contactId}</FieldDescription>
                  </Field>
                )}
                {data.dealValue && (
                  <Field orientation="horizontal">
                    <FieldLabel>Deal Value</FieldLabel>
                    <FieldDescription>{data.dealValue}</FieldDescription>
                  </Field>
                )}
                {data.expectedCloseDate && (
                  <Field orientation="horizontal">
                    <FieldLabel>Expected Close Date</FieldLabel>
                    <FieldDescription>
                      {new Date(data.expectedCloseDate).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
                {data.lostReason && (
                  <Field orientation="horizontal">
                    <FieldLabel>Lost Reason</FieldLabel>
                    <FieldDescription>{data.lostReason}</FieldDescription>
                  </Field>
                )}
                {data.probability && (
                  <Field orientation="horizontal">
                    <FieldLabel>Probability</FieldLabel>
                    <FieldDescription>{data.probability}</FieldDescription>
                  </Field>
                )}
                {data.source && (
                  <Field orientation="horizontal">
                    <FieldLabel>Source</FieldLabel>
                    <FieldDescription>{data.source}</FieldDescription>
                  </Field>
                )}
                {data.stage && (
                  <Field orientation="horizontal">
                    <FieldLabel>Stage</FieldLabel>
                    <FieldDescription>{data.stage}</FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Timestamps</FieldLegend>
              <FieldDescription>
                Creation and last update times.
              </FieldDescription>
              <FieldGroup>
                {data.createdAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Created At</FieldLabel>
                    <FieldDescription>
                      {new Date(data.createdAt).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
                {data.updatedAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Updated At</FieldLabel>
                    <FieldDescription>
                      {new Date(data.updatedAt).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOpportunityFormDialog;
