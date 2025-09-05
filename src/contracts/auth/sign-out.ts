import { oc } from '@orpc/contract';
import z from 'zod';

export default oc.output(z.object({ success: z.boolean() }));
