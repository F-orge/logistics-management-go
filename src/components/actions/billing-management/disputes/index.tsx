import React from "react";
import CreateDisputeFormDialog from "./create";
import DeleteDisputeFormDialog from "./delete";
import UpdateDisputeFormDialog from "./update";

export default [
	<CreateDisputeFormDialog />,
	<UpdateDisputeFormDialog />,
	<DeleteDisputeFormDialog />,
] satisfies React.ReactNode;
