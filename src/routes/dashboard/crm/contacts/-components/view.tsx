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

const ViewContactFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/contacts' });
  const searchQuery = useSearch({ from: '/dashboard/crm/contacts/' });
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/contacts/' });
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
          <DialogTitle>Contact Details</DialogTitle>
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
                Fundamental details about the contact.
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
                {data.phoneNumber && (
                  <Field orientation="horizontal">
                    <FieldLabel>Phone Number</FieldLabel>
                    <FieldDescription>{data.phoneNumber}</FieldDescription>
                  </Field>
                )}
                {data.jobTitle && (
                  <Field orientation="horizontal">
                    <FieldLabel>Job Title</FieldLabel>
                    <FieldDescription>{data.jobTitle}</FieldDescription>
                  </Field>
                )}
                {data.companyId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Company ID</FieldLabel>
                    <FieldDescription>{data.companyId}</FieldDescription>
                  </Field>
                )}
                {data.ownerId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Owner ID</FieldLabel>
                    <FieldDescription>{data.ownerId}</FieldDescription>
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

export default ViewContactFormDialog;
