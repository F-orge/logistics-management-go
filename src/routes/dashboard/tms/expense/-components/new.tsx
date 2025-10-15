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
import { createExpense } from '@/queries/tms'
import { tmsExpenseInsertSchema } from '@/schemas/tms/expense'

const NewExpenseFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/expense',
  })
  const searchQuery = useSearch({
    from: '/dashboard/tms/expense/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/expense/',
  })

  const createMutation = useMutation(createExpense, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Expense</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new expense record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsExpenseInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsExpenseInsertSchema>) => {
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

export default NewExpenseFormDialog
