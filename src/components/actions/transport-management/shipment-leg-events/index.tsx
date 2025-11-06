import React from "react";
import CreateShipmentLegEventFormDialog from "./create";
import DeleteShipmentLegEventFormDialog from "./delete";
import UpdateShipmentLegEventFormDialog from "./update";

export default [
	<CreateShipmentLegEventFormDialog />,
	<UpdateShipmentLegEventFormDialog />,
	<DeleteShipmentLegEventFormDialog />,
] satisfies React.ReactNode;
