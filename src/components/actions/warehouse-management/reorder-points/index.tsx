import React from "react";
import CreateReorderPointFormDialog from "./create";
import DeleteReorderPointFormDialog from "./delete";
import UpdateReorderPointFormDialog from "./update";

export default [
	<CreateReorderPointFormDialog />,
	<UpdateReorderPointFormDialog />,
	<DeleteReorderPointFormDialog />,
] satisfies React.ReactNode;
