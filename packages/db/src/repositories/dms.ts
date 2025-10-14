import { CustomerTrackingLinkSchema } from '@/schemas/dms/customer_tracking_link';
import { DeliveryRouteSchema } from '@/schemas/dms/delivery_route';
import { DeliveryTaskSchema } from '@/schemas/dms/delivery_task';
import { DriverLocationSchema } from '@/schemas/dms/driver_location';
import { ProofOfDeliverySchema } from '@/schemas/dms/proof_of_delivery';
import { TaskEventSchema } from '@/schemas/dms/task_event';
import { repositoryFactory } from './interface';

export const CustomerTrackingLinkRepository = repositoryFactory(
  'dms.customerTrackingLinks',
  CustomerTrackingLinkSchema,
);
export const DeliveryRouteRepository = repositoryFactory(
  'dms.deliveryRoutes',
  DeliveryRouteSchema,
);
export const DeliveryTaskRepository = repositoryFactory(
  'dms.deliveryTasks',
  DeliveryTaskSchema,
);
export const DriverLocationRepository = repositoryFactory(
  'dms.driverLocations',
  DriverLocationSchema,
);
export const ProofOfDeliveryRepository = repositoryFactory(
  'dms.proofOfDeliveries',
  ProofOfDeliverySchema,
);
export const TaskEventRepository = repositoryFactory(
  'dms.taskEvents',
  TaskEventSchema,
);