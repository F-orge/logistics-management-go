import { ZodProvider } from '@autoform/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useRouteContext, useSearch } from '@tanstack/react-router'
import type z from 'zod'
import { AutoForm } from '@/components/ui/autoform'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FieldSeparator } from '@/components/ui/field'
import { createNotification } from '@/queries/crm/notifications'
import { crmNotificationInsertSchema } from '@/schemas/crm/notifications'

const NewNotificationFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/notifications' })
  const searchQuery = useSearch({ from: '/dashboard/crm/notifications/' })
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/notifications/',
  })

  const createMutation = useMutation(createNotification, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new notification record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmNotificationInsertSchema)}
          onSubmit={async (value: z.infer<typeof crmNotificationInsertSchema>) => {
            await createMutation.mutateAsync(value, {
              onSuccess: () => {
                navigate({ search: (prev) => ({ ...prev, new: undefined }) })
              },
            })
          }}
          withSubmit
        />
      </DialogContent>
    </Dialog>
  )
}

export default NewNotificationFormDialog
