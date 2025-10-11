import {
  useLoaderData,
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
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
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';

const ViewCompanyFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/companies' });
  const searchQuery = useSearch({ from: '/dashboard/crm/companies/' });
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/companies/' });
  const { orpcClient } = useRouteContext({ from: '/dashboard/crm/companies/' });
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
          <DialogTitle>Company Details</DialogTitle>
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
                Fundamental details about the company.
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
                {data.industry && (
                  <Field orientation="horizontal">
                    <FieldLabel>Industry</FieldLabel>
                    <FieldDescription>{data.industry}</FieldDescription>
                  </Field>
                )}
                {data.website && (
                  <Field orientation="horizontal">
                    <FieldLabel>Website</FieldLabel>
                    <FieldDescription>
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.website}
                      </a>
                    </FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Contact Information</FieldLegend>
              <FieldDescription>
                Primary contact details for the company.
              </FieldDescription>
              <FieldGroup>
                {data.phoneNumber && (
                  <Field orientation="responsive">
                    <FieldLabel>Phone Number</FieldLabel>
                    <FieldDescription>{data.phoneNumber}</FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Address Information</FieldLegend>
              <FieldDescription>
                Physical address of the company.
              </FieldDescription>
              <FieldGroup>
                {data.street && (
                  <Field orientation="horizontal">
                    <FieldLabel>Street</FieldLabel>
                    <FieldDescription>{data.street}</FieldDescription>
                  </Field>
                )}
                {data.city && (
                  <Field orientation="horizontal">
                    <FieldLabel>City</FieldLabel>
                    <FieldDescription>{data.city}</FieldDescription>
                  </Field>
                )}
                {data.state && (
                  <Field orientation="horizontal">
                    <FieldLabel>State</FieldLabel>
                    <FieldDescription>{data.state}</FieldDescription>
                  </Field>
                )}
                {data.postalCode && (
                  <Field orientation="horizontal">
                    <FieldLabel>Postal Code</FieldLabel>
                    <FieldDescription>{data.postalCode}</FieldDescription>
                  </Field>
                )}
                {data.country && (
                  <Field orientation="horizontal">
                    <FieldLabel>Country</FieldLabel>
                    <FieldDescription>{data.country}</FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Financial Information</FieldLegend>
              <FieldDescription>
                Details regarding the company's financial status.
              </FieldDescription>
              <FieldGroup>
                {data.annualRevenue && (
                  <Field orientation="horizontal">
                    <FieldLabel>Annual Revenue</FieldLabel>
                    <FieldDescription>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(data.annualRevenue)}
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

export default ViewCompanyFormDialog;
