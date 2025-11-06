import React from "react";
import CreateDriverFormDialog from "./create";
import DeleteDriverFormDialog from "./delete";
import UpdateDriverFormDialog from "./update";

export default [
	<CreateDriverFormDialog />,
	<UpdateDriverFormDialog />,
	<DeleteDriverFormDialog />,
] satisfies React.ReactNode;
