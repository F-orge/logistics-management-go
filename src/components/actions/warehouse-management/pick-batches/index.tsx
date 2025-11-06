import React from "react";
import CreatePickBatchFormDialog from "./create";
import DeletePickBatchFormDialog from "./delete";
import UpdatePickBatchFormDialog from "./update";

export default [
	<CreatePickBatchFormDialog />,
	<UpdatePickBatchFormDialog />,
	<DeletePickBatchFormDialog />,
] satisfies React.ReactNode;
