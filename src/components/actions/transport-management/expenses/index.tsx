import React from "react";
import CreateExpenseFormDialog from "./create";
import DeleteExpenseFormDialog from "./delete";
import UpdateExpenseFormDialog from "./update";

export default [
	<CreateExpenseFormDialog />,
	<UpdateExpenseFormDialog />,
	<DeleteExpenseFormDialog />,
] satisfies React.ReactNode;
