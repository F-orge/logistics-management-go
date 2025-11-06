import React from "react";
import CreateInventoryBatchFormDialog from "./create";
import DeleteInventoryBatchFormDialog from "./delete";
import UpdateInventoryBatchFormDialog from "./update";

export default [
	<CreateInventoryBatchFormDialog />,
	<UpdateInventoryBatchFormDialog />,
	<DeleteInventoryBatchFormDialog />,
] satisfies React.ReactNode;
