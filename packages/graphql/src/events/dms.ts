import type { Selectable } from "kysely";
import type {
	DB,
	DmsDeliveryTaskStatusEnum,
	DmsTaskEventStatusEnum,
} from "../db.types";

export type DmsEvents = {
	// Delivery Route Events
	"dms.deliveryRoute.started": Selectable<DB["dms.deliveryRoutes"]>;
	"dms.deliveryRoute.completed": Selectable<DB["dms.deliveryRoutes"]>;
	"dms.deliveryRoute.paused": Selectable<DB["dms.deliveryRoutes"]>;
	"dms.deliveryRoute.cancelled": Selectable<DB["dms.deliveryRoutes"]>;

	// Delivery Task Events
	"dms.deliveryTask.statusChanged": {
		id: string;
		newStatus: DmsDeliveryTaskStatusEnum;
		previousStatus: DmsDeliveryTaskStatusEnum;
		deliveryRouteId: string;
	};
	"dms.deliveryTask.outForDelivery": Selectable<DB["dms.deliveryTasks"]>;
	"dms.deliveryTask.delivered": Selectable<DB["dms.deliveryTasks"]>;
	"dms.deliveryTask.failed": Selectable<DB["dms.deliveryTasks"]> & {
		failureReason: string | null;
	};

	// Customer Tracking Link Events
	"dms.trackingLink.generated": Selectable<DB["dms.customerTrackingLinks"]>;
	"dms.trackingLink.expired": {
		id: string;
		deliveryTaskId: string;
		trackingToken: string;
	};

	// Task Events
	"dms.taskEvent.recorded": Selectable<DB["dms.taskEvents"]>;
	"dms.taskEvent.statusUpdated": {
		taskEventId: string;
		deliveryTaskId: string;
		newStatus: DmsTaskEventStatusEnum;
	};

	// Driver Location Events
	"dms.driverLocation.updated": Selectable<DB["dms.driverLocations"]>;
	"dms.driverLocation.removed": {
		id: string;
		driverId: string;
	};

	// Proof of Delivery Events
	"dms.proofOfDelivery.recorded": Selectable<DB["dms.proofOfDeliveries"]>;
};
