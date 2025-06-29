import { router } from '.';
import { authRouter } from './procedures/auth';
import { companyRouter } from './procedures/companies';
import { userRouter } from './procedures/users';

export type RpcRouter = typeof rpcRouter;

export const rpcRouter = router({
  auth: authRouter,
  users: userRouter,
  companies: companyRouter,
});
