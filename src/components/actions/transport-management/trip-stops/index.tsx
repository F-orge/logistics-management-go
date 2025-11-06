import React from "react";
import CreateTripStopFormDialog from "./create";
import DeleteTripStopFormDialog from "./delete";
import UpdateTripStopFormDialog from "./update";

export default [
	<CreateTripStopFormDialog />,
	<UpdateTripStopFormDialog />,
	<DeleteTripStopFormDialog />,
] satisfies React.ReactNode;
