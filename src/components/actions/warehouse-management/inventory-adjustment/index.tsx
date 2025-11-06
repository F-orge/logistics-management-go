import React from "react";
import CreateInventoryAdjustmentFormDialog from "./create";
import DeleteInventoryAdjustmentFormDialog from "./delete";
import UpdateInventoryAdjustmentFormDialog from "./update";

export default [
	<CreateInventoryAdjustmentFormDialog />,
	<UpdateInventoryAdjustmentFormDialog />,
	<DeleteInventoryAdjustmentFormDialog />,
] satisfies React.ReactNode;
