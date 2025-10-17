import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import * as contracts from '@packages/rpc/contracts/tms/expense'
import { ExpenseRepository } from '@packages/db/repositories/tms'

export const PaginateExpense = implement(contracts.PaginateExpenseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const expenseRepo = ExpenseRepository.fns(context.kysely)
    return await expenseRepo.paginate(input)
  })

export const RangeExpense = implement(contracts.RangeExpenseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const expenseRepo = ExpenseRepository.fns(context.kysely)
    return await expenseRepo.range(input)
  })

export const AnyExpense = implement(contracts.AnyExpenseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const expenseRepo = ExpenseRepository.fns(context.kysely)
    return await expenseRepo.any(input)
  })

export const InsertExpense = implement(contracts.InsertExpenseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const expenseRepo = ExpenseRepository.fns(context.kysely)
    return await expenseRepo.insert(input)
  })

export const InsertManyExpense = implement(contracts.InsertManyExpenseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const expenseRepo = ExpenseRepository.fns(context.kysely)
    return await expenseRepo.insertMany(input)
  })

export const UpdateExpense = implement(contracts.UpdateExpenseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const expenseRepo = ExpenseRepository.fns(context.kysely)
    return await expenseRepo.update(input.id, input.value)
  })

export const RemoveExpense = implement(contracts.RemoveExpenseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const expenseRepo = ExpenseRepository.fns(context.kysely)
    return await expenseRepo.remove(input)
  })
