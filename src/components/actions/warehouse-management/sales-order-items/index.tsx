import React from "react";
import CreateSalesOrderItemFormDialog from "./create";
import DeleteSalesOrderItemFormDialog from "./delete";
import UpdateSalesOrderItemFormDialog from "./update";

export default [
	<CreateSalesOrderItemFormDialog />,
	<UpdateSalesOrderItemFormDialog />,
	<DeleteSalesOrderItemFormDialog />,
] satisfies React.ReactNode;
