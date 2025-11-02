import type { Selectable } from "kysely";
import type {
	DB,
	TmsDriverStatusEnum,
	TmsExpenseStatusEnum,
	TmsTripStatusEnum,
	TmsVehicleStatusEnum,
} from "../db.types";

export type TmsEvents = {
	// Trip Events
	"tms.trip.created": Selectable<DB["tms.trips"]>;
	"tms.trip.started": Selectable<DB["tms.trips"]>;
	"tms.trip.completed": Selectable<DB["tms.trips"]>;
	"tms.trip.cancelled": Selectable<DB["tms.trips"]>;
	"tms.trip.statusChanged": {
		id: string;
		newStatus: TmsTripStatusEnum;
		previousStatus: TmsTripStatusEnum;
		driverId: string | null;
		vehicleId: string | null;
	};

	// Trip Stop Events
	"tms.tripStop.arrived": Selectable<DB["tms.tripStops"]>;
	"tms.tripStop.completed": Selectable<DB["tms.tripStops"]>;
	"tms.tripStop.skipped": Selectable<DB["tms.tripStops"]> & {
		reason: string | null;
	};

	// Geofence Events
	"tms.geofence.entered": Selectable<DB["tms.geofenceEvents"]> & {
		geofenceName: string;
	};
	"tms.geofence.exited": Selectable<DB["tms.geofenceEvents"]> & {
		geofenceName: string;
	};

	// Driver Events
	"tms.driver.statusChanged": {
		id: string;
		newStatus: TmsDriverStatusEnum;
		previousStatus: TmsDriverStatusEnum;
	};

	// Vehicle Events
	"tms.vehicle.statusChanged": {
		id: string;
		newStatus: TmsVehicleStatusEnum;
		previousStatus: TmsVehicleStatusEnum;
	};
	"tms.vehicle.maintenanceScheduled": Selectable<DB["tms.vehicleMaintenance"]>;

	// Expense Events
	"tms.expense.submitted": Selectable<DB["tms.expenses"]>;
	"tms.expense.statusChanged": {
		id: string;
		newStatus: TmsExpenseStatusEnum;
		previousStatus: TmsExpenseStatusEnum;
		driverId: string | null;
	};
	"tms.expense.approved": Selectable<DB["tms.expenses"]>;
	"tms.expense.rejected": Selectable<DB["tms.expenses"]> & {
		rejectionReason: string | null;
	};
};
