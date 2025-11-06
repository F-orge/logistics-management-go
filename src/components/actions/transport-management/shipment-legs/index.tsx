import React from "react";
import CreateShipmentLegFormDialog from "./create";
import DeleteShipmentLegFormDialog from "./delete";
import UpdateShipmentLegFormDialog from "./update";

export default [
	<CreateShipmentLegFormDialog />,
	<UpdateShipmentLegFormDialog />,
	<DeleteShipmentLegFormDialog />,
] satisfies React.ReactNode;
