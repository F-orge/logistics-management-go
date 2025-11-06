import React from "react";
import CreateOutboundShipmentItemFormDialog from "./create";
import DeleteOutboundShipmentItemFormDialog from "./delete";
import UpdateOutboundShipmentItemFormDialog from "./update";

export default [
	<CreateOutboundShipmentItemFormDialog />,
	<UpdateOutboundShipmentItemFormDialog />,
	<DeleteOutboundShipmentItemFormDialog />,
] satisfies React.ReactNode;
