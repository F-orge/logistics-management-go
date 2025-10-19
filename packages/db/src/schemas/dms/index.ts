import { z } from "zod";
import { CustomerTrackingLinkSchema } from "./customer_tracking_link";
import { DeliveryRouteSchema } from "./delivery_route";
import { DeliveryTaskSchema } from "./delivery_task";
import { DriverLocationSchema } from "./driver_location";
import { ProofOfDeliverySchema } from "./proof_of_delivery";
import { TaskEventSchema } from "./task_event";

export default z.object({
  customerTrackingLinks: CustomerTrackingLinkSchema,
  deliveryRoutes: DeliveryRouteSchema,
  deliveryTasks: DeliveryTaskSchema,
  driverLocations: DriverLocationSchema,
  proofOfDeliveries: ProofOfDeliverySchema,
  taskEvents: TaskEventSchema,
});
