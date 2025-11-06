import React from "react";
import CreateVehicleFormDialog from "./create";
import DeleteVehicleFormDialog from "./delete";
import UpdateVehicleFormDialog from "./update";

export default [
	<CreateVehicleFormDialog />,
	<UpdateVehicleFormDialog />,
	<DeleteVehicleFormDialog />,
] satisfies React.ReactNode;
