import { os } from '@orpc/server';

export default os.route({ method: 'GET' }).handler(() => 'server healthy');
