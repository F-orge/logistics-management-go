import React from "react";
import CreateCaseFormDialog from "./create";
import DeleteCaseFormDialog from "./delete";
import UpdateCaseFormDialog from "./update";

export default [
	<CreateCaseFormDialog />,
	<UpdateCaseFormDialog />,
	<DeleteCaseFormDialog />,
] satisfies React.ReactNode;
