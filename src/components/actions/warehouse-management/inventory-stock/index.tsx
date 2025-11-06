import React from "react";
import CreateInventoryStockFormDialog from "./create";
import DeleteInventoryStockFormDialog from "./delete";
import UpdateInventoryStockFormDialog from "./update";

export default [
	<CreateInventoryStockFormDialog />,
	<UpdateInventoryStockFormDialog />,
	<DeleteInventoryStockFormDialog />,
] satisfies React.ReactNode;
