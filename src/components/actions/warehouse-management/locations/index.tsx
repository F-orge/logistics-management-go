import React from "react";
import CreateLocationFormDialog from "./create";
import DeleteLocationFormDialog from "./delete";
import UpdateLocationFormDialog from "./update";

export default [
	<CreateLocationFormDialog />,
	<UpdateLocationFormDialog />,
	<DeleteLocationFormDialog />,
] satisfies React.ReactNode;
