import React from "react";
import CreateReturnFormDialog from "./create";
import DeleteReturnFormDialog from "./delete";
import UpdateReturnFormDialog from "./update";

export default [
	<CreateReturnFormDialog />,
	<UpdateReturnFormDialog />,
	<DeleteReturnFormDialog />,
] satisfies React.ReactNode;
