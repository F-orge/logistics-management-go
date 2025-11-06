import React from "react";
import CreateReturnItemFormDialog from "./create";
import DeleteReturnItemFormDialog from "./delete";
import UpdateReturnItemFormDialog from "./update";

export default [
	<CreateReturnItemFormDialog />,
	<UpdateReturnItemFormDialog />,
	<DeleteReturnItemFormDialog />,
] satisfies React.ReactNode;
