import React from "react";
import CreateGeofenceFormDialog from "./create";
import DeleteGeofenceFormDialog from "./delete";
import UpdateGeofenceFormDialog from "./update";

export default [
	<CreateGeofenceFormDialog />,
	<UpdateGeofenceFormDialog />,
	<DeleteGeofenceFormDialog />,
] satisfies React.ReactNode;
