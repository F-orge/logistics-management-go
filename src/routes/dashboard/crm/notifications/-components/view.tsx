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
import BooleanCell from '@/components/table/cells/boolean';

const ViewNotificationFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/notifications' });
  const searchQuery = useSearch({ from: '/dashboard/crm/notifications/' });
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/notifications/' });
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
          <DialogTitle>Notification Details</DialogTitle>
          <DialogDescription>
            Detailed information about the notification.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <div className="grid gap-4 py-4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>
                Fundamental details about the notification.
              </FieldDescription>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel>ID</FieldLabel>
                  <FieldDescription>{data.id}</FieldDescription>
                </Field>
                {data.userId && (
                  <Field orientation="horizontal">
                    <FieldLabel>User ID</FieldLabel>
                    <FieldDescription>{data.userId}</FieldDescription>
                  </Field>
                )}
                {data.message && (
                  <Field orientation="horizontal">
                    <FieldLabel>Message</FieldLabel>
                    <FieldDescription>{data.message}</FieldDescription>
                  </Field>
                )}
                {data.link && (
                  <Field orientation="horizontal">
                    <FieldLabel>Link</FieldLabel>
                    <FieldDescription>{data.link}</FieldDescription>
                  </Field>
                )}
                <Field orientation="horizontal">
                  <FieldLabel>Is Read</FieldLabel>
                  <FieldDescription>
                    <BooleanCell value={data.isRead} />
                  </FieldDescription>
                </Field>
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

export default ViewNotificationFormDialog;
