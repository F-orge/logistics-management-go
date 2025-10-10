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
import {
  useLoaderData,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';

const ViewLeadFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/leads' });
  const searchQuery = useSearch({ from: '/dashboard/crm/leads/' });
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/leads/' });
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
          <DialogTitle>Lead Details</DialogTitle>
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
                Fundamental details about the lead.
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
                {data.email && (
                  <Field orientation="horizontal">
                    <FieldLabel>Email</FieldLabel>
                    <FieldDescription>{data.email}</FieldDescription>
                  </Field>
                )}
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
                {data.leadScore && (
                  <Field orientation="horizontal">
                    <FieldLabel>Lead Score</FieldLabel>
                    <FieldDescription>{data.leadScore}</FieldDescription>
                  </Field>
                )}
                {data.leadSource && (
                  <Field orientation="horizontal">
                    <FieldLabel>Lead Source</FieldLabel>
                    <FieldDescription>{data.leadSource}</FieldDescription>
                  </Field>
                )}
                {data.status && (
                  <Field orientation="horizontal">
                    <FieldLabel>Status</FieldLabel>
                    <FieldDescription>{data.status}</FieldDescription>
                  </Field>
                )}
                {data.convertedAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Converted At</FieldLabel>
                    <FieldDescription>
                      {new Date(data.convertedAt).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
                {data.convertedCompanyId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Converted Company ID</FieldLabel>
                    <FieldDescription>{data.convertedCompanyId}</FieldDescription>
                  </Field>
                )}
                {data.convertedContactId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Converted Contact ID</FieldLabel>
                    <FieldDescription>{data.convertedContactId}</FieldDescription>
                  </Field>
                )}
                {data.convertedOpportunityId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Converted Opportunity ID</FieldLabel>
                    <FieldDescription>{data.convertedOpportunityId}</FieldDescription>
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

export default ViewLeadFormDialog;
