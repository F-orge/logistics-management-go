import React from "react";
import CreateTaskFormDialog from "./create";
import DeleteTaskFormDialog from "./delete";
import UpdateTaskFormDialog from "./update";

export default [
	<CreateTaskFormDialog />,
	<UpdateTaskFormDialog />,
	<DeleteTaskFormDialog />,
] satisfies React.ReactNode;
