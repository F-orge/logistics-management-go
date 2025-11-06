import React from "react";
import CreateVehicleMaintenanceFormDialog from "./create";
import DeleteVehicleMaintenanceFormDialog from "./delete";
import UpdateVehicleMaintenanceFormDialog from "./update";

export default [
	<CreateVehicleMaintenanceFormDialog />,
	<UpdateVehicleMaintenanceFormDialog />,
	<DeleteVehicleMaintenanceFormDialog />,
] satisfies React.ReactNode;
