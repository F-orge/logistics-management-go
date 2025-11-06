import React from "react";
import CreateTaskItemFormDialog from "./create";
import DeleteTaskItemFormDialog from "./delete";
import UpdateTaskItemFormDialog from "./update";

export default [
	<CreateTaskItemFormDialog />,
	<UpdateTaskItemFormDialog />,
	<DeleteTaskItemFormDialog />,
] satisfies React.ReactNode;
