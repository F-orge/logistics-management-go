import React from "react";
import CreateInboundShipmentFormDialog from "./create";
import DeleteInboundShipmentFormDialog from "./delete";
import UpdateInboundShipmentFormDialog from "./update";

export default [
	<CreateInboundShipmentFormDialog />,
	<UpdateInboundShipmentFormDialog />,
	<DeleteInboundShipmentFormDialog />,
] satisfies React.ReactNode;
