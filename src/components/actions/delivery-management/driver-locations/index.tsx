import React from "react";
import CreateDriverLocationFormDialog from "./create";
import DeleteDriverLocationFormDialog from "./delete";
import UpdateDriverLocationFormDialog from "./update";

export default [
	<CreateDriverLocationFormDialog />,
	<UpdateDriverLocationFormDialog />,
	<DeleteDriverLocationFormDialog />,
] satisfies React.ReactNode;
