import React from "react";
import CreateRouteFormDialog from "./create";
import DeleteRouteFormDialog from "./delete";
import UpdateRouteFormDialog from "./update";

export default [
	<CreateRouteFormDialog />,
	<UpdateRouteFormDialog />,
	<DeleteRouteFormDialog />,
] satisfies React.ReactNode;
