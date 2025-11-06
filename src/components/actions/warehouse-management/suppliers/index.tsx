import React from "react";
import CreateSupplierFormDialog from "./create";
import DeleteSupplierFormDialog from "./delete";
import UpdateSupplierFormDialog from "./update";

export default [
	<CreateSupplierFormDialog />,
	<UpdateSupplierFormDialog />,
	<DeleteSupplierFormDialog />,
] satisfies React.ReactNode;
