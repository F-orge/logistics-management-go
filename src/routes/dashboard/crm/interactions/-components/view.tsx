import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'

const ViewInteractionFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/interactions' })
  const searchQuery = useSearch({ from: '/dashboard/crm/interactions/' })
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/interactions/' })
  const data = dataTable.find((row) => row.id === searchQuery.id)

  if (!data) {
    return <></>
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
          <DialogTitle>Interaction Details</DialogTitle>
          <DialogDescription>Detailed information about the interaction.</DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <div className="grid gap-4 py-4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>Fundamental details about the interaction.</FieldDescription>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel>ID</FieldLabel>
                  <FieldDescription>{data.id}</FieldDescription>
                </Field>
                {data.contactId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Contact ID</FieldLabel>
                    <FieldDescription>{data.contactId}</FieldDescription>
                  </Field>
                )}
                {data.userId && (
                  <Field orientation="horizontal">
                    <FieldLabel>User ID</FieldLabel>
                    <FieldDescription>{data.userId}</FieldDescription>
                  </Field>
                )}
                {data.caseId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Case ID</FieldLabel>
                    <FieldDescription>{data.caseId}</FieldDescription>
                  </Field>
                )}
                {data.type && (
                  <Field orientation="horizontal">
                    <FieldLabel>Type</FieldLabel>
                    <FieldDescription>{data.type}</FieldDescription>
                  </Field>
                )}
                {data.interactionDate && (
                  <Field orientation="horizontal">
                    <FieldLabel>Interaction Date</FieldLabel>
                    <FieldDescription>
                      {new Date(data.interactionDate).toLocaleString()}
                    </FieldDescription>
                  </Field>
                )}
                {data.notes && (
                  <Field orientation="horizontal">
                    <FieldLabel>Notes</FieldLabel>
                    <FieldDescription>{data.notes}</FieldDescription>
                  </Field>
                )}
                {data.outcome && (
                  <Field orientation="horizontal">
                    <FieldLabel>Outcome</FieldLabel>
                    <FieldDescription>{data.outcome}</FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Timestamps</FieldLegend>
              <FieldDescription>Creation and last update times.</FieldDescription>
              <FieldGroup>
                {data.createdAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Created At</FieldLabel>
                    <FieldDescription>{new Date(data.createdAt).toLocaleString()}</FieldDescription>
                  </Field>
                )}
                {data.updatedAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Updated At</FieldLabel>
                    <FieldDescription>{new Date(data.updatedAt).toLocaleString()}</FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewInteractionFormDialog
