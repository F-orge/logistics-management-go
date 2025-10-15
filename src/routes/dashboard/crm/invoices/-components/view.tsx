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

const ViewInvoiceFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/invoices' })
  const searchQuery = useSearch({ from: '/dashboard/crm/invoices/' })
  const { dataTable } = useLoaderData({ from: '/dashboard/crm/invoices/' })
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
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>Detailed information about the invoice.</DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <div className="grid gap-4 py-4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Basic Information</FieldLegend>
              <FieldDescription>Fundamental details about the invoice.</FieldDescription>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldLabel>ID</FieldLabel>
                  <FieldDescription>{data.id}</FieldDescription>
                </Field>
                {data.issueDate && (
                  <Field orientation="horizontal">
                    <FieldLabel>Issue Date</FieldLabel>
                    <FieldDescription>{new Date(data.issueDate).toLocaleString()}</FieldDescription>
                  </Field>
                )}
                {data.dueDate && (
                  <Field orientation="horizontal">
                    <FieldLabel>Due Date</FieldLabel>
                    <FieldDescription>{new Date(data.dueDate).toLocaleString()}</FieldDescription>
                  </Field>
                )}
                {data.paidAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Paid At</FieldLabel>
                    <FieldDescription>{new Date(data.paidAt).toLocaleString()}</FieldDescription>
                  </Field>
                )}
                {data.sentAt && (
                  <Field orientation="horizontal">
                    <FieldLabel>Sent At</FieldLabel>
                    <FieldDescription>{new Date(data.sentAt).toLocaleString()}</FieldDescription>
                  </Field>
                )}
                {data.opportunityId && (
                  <Field orientation="horizontal">
                    <FieldLabel>Opportunity ID</FieldLabel>
                    <FieldDescription>{data.opportunityId}</FieldDescription>
                  </Field>
                )}
                {data.paymentMethod && (
                  <Field orientation="horizontal">
                    <FieldLabel>Payment Method</FieldLabel>
                    <FieldDescription>{data.paymentMethod}</FieldDescription>
                  </Field>
                )}
                {data.status && (
                  <Field orientation="horizontal">
                    <FieldLabel>Status</FieldLabel>
                    <FieldDescription>{data.status}</FieldDescription>
                  </Field>
                )}
                {data.total && (
                  <Field orientation="horizontal">
                    <FieldLabel>Total</FieldLabel>
                    <FieldDescription>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(data.total)}
                    </FieldDescription>
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

export default ViewInvoiceFormDialog
