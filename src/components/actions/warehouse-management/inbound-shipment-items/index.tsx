import React from "react";
import CreateInboundShipmentItemFormDialog from "./create";
import DeleteInboundShipmentItemFormDialog from "./delete";
import UpdateInboundShipmentItemFormDialog from "./update";

export default [
	<CreateInboundShipmentItemFormDialog />,
	<UpdateInboundShipmentItemFormDialog />,
	<DeleteInboundShipmentItemFormDialog />,
] satisfies React.ReactNode;
