// Imports
import { implement } from '@orpc/server'
import { NotificationRepository } from '@packages/db/repositories/crm'
import { UserRepository } from '@packages/db/repositories/auth'
import * as contracts from '@/contracts/crm/notifications'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'

// Handlers

export const PaginateNotification = implement(contracts.PaginateNotificationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const notificationRepo = NotificationRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await notificationRepo.paginate(input)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)
    const users = await userRepo.any(userIds)

    return result.map((row) => ({
      ...row,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const RangeNotification = implement(contracts.RangeNotificationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const notificationRepo = NotificationRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await notificationRepo.range(input)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)
    const users = await userRepo.any(userIds)

    return result.map((row) => ({
      ...row,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const AnyNotification = implement(contracts.AnyNotificationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const notificationRepo = NotificationRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await notificationRepo.any(input)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)
    const users = await userRepo.any(userIds)

    return result.map((row) => ({
      ...row,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const InsertNotification = implement(contracts.InsertNotificationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const notificationRepo = NotificationRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await notificationRepo.insert(input)
    const users = await userRepo.any([result.userId])

    return {
      ...result,
      user: users.find((u) => u.id === result.userId)!,
    }
  })

export const InsertManyNotification = implement(contracts.InsertManyNotificationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const notificationRepo = NotificationRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await notificationRepo.insertMany(input)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)
    const users = await userRepo.any(userIds)

    return result.map((row) => ({
      ...row,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const UpdateNotification = implement(contracts.UpdateNotificationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const notificationRepo = NotificationRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await notificationRepo.update(input.id, input.value)
    const users = await userRepo.any([result.userId])

    return {
      ...result,
      user: users.find((u) => u.id === result.userId)!,
    }
  })

export const RemoveNotification = implement(contracts.RemoveNotificationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const notificationRepo = NotificationRepository.fns(context.kysely)
    return await notificationRepo.remove(input)
  })
