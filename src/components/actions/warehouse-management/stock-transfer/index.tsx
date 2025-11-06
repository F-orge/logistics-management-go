import React from "react";
import CreateStockTransferFormDialog from "./create";
import DeleteStockTransferFormDialog from "./delete";
import UpdateStockTransferFormDialog from "./update";

export default [
	<CreateStockTransferFormDialog />,
	<UpdateStockTransferFormDialog />,
	<DeleteStockTransferFormDialog />,
] satisfies React.ReactNode;
