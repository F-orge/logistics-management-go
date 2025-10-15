import { UserSchema } from '@/schemas/auth/user'
import { repositoryFactory } from './interface'

export const UserRepository = repositoryFactory('user', UserSchema)
