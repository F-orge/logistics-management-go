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
import { createReturn } from '@/queries/wms'
import { wmsReturnInsertSchema } from '@/schemas/wms/return'

const NewReturnFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/return',
  })
  const searchQuery = useSearch({
    from: '/dashboard/wms/return/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/return/',
  })

  const createMutation = useMutation(createReturn, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Return</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new return record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsReturnInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsReturnInsertSchema>) => {
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

export default NewReturnFormDialog
