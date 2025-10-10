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

const ViewCampaignFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/campaigns' });
  const searchQuery = useSearch({ from: '/dashboard/crm/campaigns/' });
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/campaigns/' });
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
          <DialogTitle>Campaign Details</DialogTitle>
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
                Fundamental details about the campaign.
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
                {data.budget && (
                  <Field orientation="horizontal">
                    <FieldLabel>Budget</FieldLabel>
                    <FieldDescription>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(data.budget)}
                    </FieldDescription>
                  </Field>
                )}
                {data.startDate && (
                  <Field orientation="horizontal">
                    <FieldLabel>Start Date</FieldLabel>
                    <FieldDescription>
                      {new Date(data.startDate).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
                {data.endDate && (
                  <Field orientation="horizontal">
                    <FieldLabel>End Date</FieldLabel>
                    <FieldDescription>
                      {new Date(data.endDate).toLocaleString()}
                    </FieldDescription>
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

export default ViewCampaignFormDialog;
