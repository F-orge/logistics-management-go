import React from "react";
import CreateWarehouseFormDialog from "./create";
import DeleteWarehouseFormDialog from "./delete";
import UpdateWarehouseFormDialog from "./update";

export default [
	<CreateWarehouseFormDialog />,
	<UpdateWarehouseFormDialog />,
	<DeleteWarehouseFormDialog />,
] satisfies React.ReactNode;
