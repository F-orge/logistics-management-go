import React from "react";
import CreateTripFormDialog from "./create";
import DeleteTripFormDialog from "./delete";
import UpdateTripFormDialog from "./update";

export default [
	<CreateTripFormDialog />,
	<UpdateTripFormDialog />,
	<DeleteTripFormDialog />,
] satisfies React.ReactNode;
