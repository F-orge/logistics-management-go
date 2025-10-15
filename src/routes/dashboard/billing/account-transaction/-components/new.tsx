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
import { createAccountTransaction } from '@/queries/billing'
import { billingAccountTransactionInsertSchema } from '@/schemas/billing/account_transaction'

const NewAccountTransactionFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/account-transaction',
  })
  const searchQuery = useSearch({
    from: '/dashboard/billing/account-transaction/',
  })
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/account-transaction/',
  })

  const createMutation = useMutation(createAccountTransaction, queryClient)

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() => navigate({ search: (prev) => ({ ...prev, new: undefined }) })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Account Transaction</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new account transaction record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingAccountTransactionInsertSchema)}
          onSubmit={async (value: z.infer<typeof billingAccountTransactionInsertSchema>) => {
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

export default NewAccountTransactionFormDialog
