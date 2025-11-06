import React from "react";
import CreateSalesOrderFormDialog from "./create";
import DeleteSalesOrderFormDialog from "./delete";
import UpdateSalesOrderFormDialog from "./update";

export default [
	<CreateSalesOrderFormDialog />,
	<UpdateSalesOrderFormDialog />,
	<DeleteSalesOrderFormDialog />,
] satisfies React.ReactNode;
