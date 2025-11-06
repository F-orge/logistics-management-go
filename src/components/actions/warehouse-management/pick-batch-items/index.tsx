import React from "react";
import CreatePickBatchItemFormDialog from "./create";
import DeletePickBatchItemFormDialog from "./delete";
import UpdatePickBatchItemFormDialog from "./update";

export default [
	<CreatePickBatchItemFormDialog />,
	<UpdatePickBatchItemFormDialog />,
	<DeletePickBatchItemFormDialog />,
] satisfies React.ReactNode;
