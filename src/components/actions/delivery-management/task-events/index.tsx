import React from "react";
import CreateTaskEventFormDialog from "./create";
import DeleteTaskEventFormDialog from "./delete";
import UpdateTaskEventFormDialog from "./update";

export default [
	<CreateTaskEventFormDialog />,
	<UpdateTaskEventFormDialog />,
	<DeleteTaskEventFormDialog />,
] satisfies React.ReactNode;
