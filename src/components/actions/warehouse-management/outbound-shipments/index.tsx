import React from "react";
import CreateOutboundShipmentFormDialog from "./create";
import DeleteOutboundShipmentFormDialog from "./delete";
import UpdateOutboundShipmentFormDialog from "./update";

export default [
	<CreateOutboundShipmentFormDialog />,
	<UpdateOutboundShipmentFormDialog />,
	<DeleteOutboundShipmentFormDialog />,
] satisfies React.ReactNode;
