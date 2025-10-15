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

const ViewCaseFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/cases' })
  const searchQuery = useSearch({ from: '/dashboard/crm/cases/' })
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/cases/' })
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
          <DialogTitle>Case Details</DialogTitle>
          <DialogDescription>
            Detailed information about case number {data.caseNumber}.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <div className="grid gap-4 py-4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>Fundamental details about the case.</FieldDescription>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel>ID</FieldLabel>
                  <FieldDescription>{data.id}</FieldDescription>
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel>Case Number</FieldLabel>
                  <FieldDescription>{data.caseNumber}</FieldDescription>
                </Field>
                {data.ownerId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Owner ID</FieldLabel>
                    <FieldDescription>{data.ownerId}</FieldDescription>
                  </Field>
                )}
                {data.contactId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Contact ID</FieldLabel>
                    <FieldDescription>{data.contactId}</FieldDescription>
                  </Field>
                )}
                {data.description && (
                  <Field orientation="horizontal">
                    <FieldLabel>Description</FieldLabel>
                    <FieldDescription>{data.description}</FieldDescription>
                  </Field>
                )}
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Status Information</FieldLegend>
              <FieldDescription>Details regarding the case status and priority.</FieldDescription>
              <FieldGroup>
                {data.priority && (
                  <Field orientation="horizontal">
                    <FieldLabel>Priority</FieldLabel>
                    <FieldDescription>{data.priority}</FieldDescription>
                  </Field>
                )}
                {data.status && (
                  <Field orientation="horizontal">
                    <FieldLabel>Status</FieldLabel>
                    <FieldDescription>{data.status}</FieldDescription>
                  </Field>
                )}
                {data.type && (
                  <Field orientation="horizontal">
                    <FieldLabel>Type</FieldLabel>
                    <FieldDescription>{data.type}</FieldDescription>
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

export default ViewCaseFormDialog
